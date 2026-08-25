<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ExperienceResource\Pages;
use App\Models\Experience;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ExperienceResource extends Resource
{
    protected static ?string $model = Experience::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationGroup = 'Portfolio Content';

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Work Experience')
                    ->schema([
                        Forms\Components\TextInput::make('company')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('position')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('company_url')
                            ->url()
                            ->maxLength(255)
                            ->placeholder('https://company.com'),

                        Forms\Components\Toggle::make('is_current')
                            ->label('I currently work here')
                            ->live()
                            ->afterStateUpdated(function (Forms\Set $set, bool $state) {
                                if ($state) {
                                    $set('end_date', null);
                                }
                            }),

                        Forms\Components\DatePicker::make('start_date')
                            ->required(),

                        Forms\Components\DatePicker::make('end_date')
                            ->disabled(fn (Forms\Get $get) => $get('is_current')),

                        Forms\Components\Textarea::make('description')
                            ->rows(5)
                            ->columnSpanFull()
                            ->placeholder('Describe your key responsibilities and achievements...'),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('company')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('position')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('start_date')
                    ->date('M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('end_date')
                    ->date('M Y')
                    ->placeholder(fn ($record) => $record->is_current ? 'Present' : '-')
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_current')
                    ->boolean()
                    ->label('Current'),

                Tables\Columns\TextColumn::make('profiles_count')
                    ->counts('profiles')
                    ->label('Linked Profiles'),
            ])
            ->defaultSort('start_date', 'desc')
            ->filters([
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
            'index'  => Pages\ListExperiences::route('/'),
            'create' => Pages\CreateExperience::route('/create'),
            'edit'   => Pages\EditExperience::route('/{record}/edit'),
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
