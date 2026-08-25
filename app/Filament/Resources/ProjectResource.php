<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-folder-open';

    protected static ?string $navigationGroup = 'Portfolio Content';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Project Information')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (Forms\Set $set, ?string $state) => 
                                        $set('slug', Str::slug($state))
                                    ),

                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true),

                                Forms\Components\Textarea::make('short_description')
                                    ->required()
                                    ->rows(3)
                                    ->columnSpanFull()
                                    ->placeholder('Brief summary of what this project does...'),

                                Forms\Components\RichEditor::make('description')
                                    ->columnSpanFull()
                                    ->placeholder('Full description, features, architecture details...'),
                            ])->columns(2),

                        Forms\Components\Section::make('Technologies & Media')
                            ->schema([
                                Forms\Components\Select::make('skills')
                                    ->relationship('skills', 'name')
                                    ->multiple()
                                    ->preload()
                                    ->searchable()
                                    ->label('Project Technologies')
                                    ->helperText('Select technologies used in this project'),

                                Forms\Components\FileUpload::make('thumbnail')
                                    ->image()
                                    ->directory('projects')
                                    ->maxSize(2048)
                                    ->columnSpanFull(),
                            ]),
                    ])->columnSpan(2),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Status & Dates')
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->options([
                                        'completed' => 'Completed',
                                        'ongoing'   => 'Ongoing',
                                        'archived'  => 'Archived',
                                    ])
                                    ->default('completed')
                                    ->required(),

                                Forms\Components\Toggle::make('is_active')
                                    ->label('Publicly Active')
                                    ->default(true)
                                    ->required(),

                                Forms\Components\DatePicker::make('start_date'),

                                Forms\Components\DatePicker::make('end_date'),
                            ]),

                        Forms\Components\Section::make('Links')
                            ->schema([
                                Forms\Components\TextInput::make('github_url')
                                    ->url()
                                    ->maxLength(255)
                                    ->placeholder('https://github.com/user/repo'),

                                Forms\Components\TextInput::make('demo_url')
                                    ->url()
                                    ->maxLength(255)
                                    ->placeholder('https://demo.example.com'),
                            ]),
                    ])->columnSpan(1),
            ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('thumbnail')
                    ->square(),

                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'completed' => 'success',
                        'ongoing'   => 'warning',
                        'archived'  => 'gray',
                        default     => 'info',
                    })
                    ->sortable(),

                Tables\Columns\TextColumn::make('skills.name')
                    ->badge()
                    ->color('info')
                    ->label('Technologies')
                    ->limitList(3),

                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\TextColumn::make('profiles_count')
                    ->counts('profiles')
                    ->label('Linked Profiles'),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'completed' => 'Completed',
                        'ongoing'   => 'Ongoing',
                        'archived'  => 'Archived',
                    ]),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active Status'),
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit'   => Pages\EditProject::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
