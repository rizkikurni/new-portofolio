<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SkillResource\Pages;
use App\Models\Skill;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SkillResource extends Resource
{
    protected static ?string $model = Skill::class;

    protected static ?string $navigationIcon = 'heroicon-o-cpu-chip';

    protected static ?string $navigationGroup = 'Portfolio Content';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Skill Details')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        Forms\Components\Select::make('category')
                            ->required()
                            ->options([
                                'Frontend'         => 'Frontend',
                                'Backend'          => 'Backend',
                                'Database'         => 'Database',
                                'Programming'      => 'Programming',
                                'Machine Learning' => 'Machine Learning',
                                'DevOps'           => 'DevOps',
                                'Tools'            => 'Tools',
                                'Other'            => 'Other',
                            ])
                            ->searchable()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('category')
                                    ->required(),
                            ]),

                        Forms\Components\TextInput::make('icon')
                            ->placeholder('e.g. react, laravel, python')
                            ->maxLength(100)
                            ->helperText('Icon key or Lucide icon name'),

                        Forms\Components\Textarea::make('description')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Frontend'         => 'info',
                        'Backend'          => 'success',
                        'Database'         => 'warning',
                        'Machine Learning' => 'purple',
                        'DevOps'           => 'danger',
                        default            => 'gray',
                    })
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('icon')
                    ->placeholder('-'),

                Tables\Columns\TextColumn::make('projects_count')
                    ->counts('projects')
                    ->label('Projects'),

                Tables\Columns\TextColumn::make('profiles_count')
                    ->counts('profiles')
                    ->label('Profiles'),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'Frontend'         => 'Frontend',
                        'Backend'          => 'Backend',
                        'Database'         => 'Database',
                        'Programming'      => 'Programming',
                        'Machine Learning' => 'Machine Learning',
                        'DevOps'           => 'DevOps',
                        'Tools'            => 'Tools',
                        'Other'            => 'Other',
                    ]),
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
            'index'  => Pages\ListSkills::route('/'),
            'create' => Pages\CreateSkill::route('/create'),
            'edit'   => Pages\EditSkill::route('/{record}/edit'),
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
