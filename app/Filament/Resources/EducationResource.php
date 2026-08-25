<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EducationResource\Pages;
use App\Models\Education;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class EducationResource extends Resource
{
    protected static ?string $model = Education::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $navigationGroup = 'Portfolio Content';

    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Education Details')
                    ->schema([
                        Forms\Components\TextInput::make('institution')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('e.g. Stanford University'),

                        Forms\Components\TextInput::make('degree')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('e.g. Bachelor of Science'),

                        Forms\Components\TextInput::make('field')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('e.g. Computer Science'),

                        Forms\Components\DatePicker::make('start_date')
                            ->required(),

                        Forms\Components\DatePicker::make('end_date')
                            ->helperText('Leave empty if currently studying'),

                        Forms\Components\Textarea::make('description')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('institution')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('degree')
                    ->searchable(),

                Tables\Columns\TextColumn::make('field')
                    ->searchable(),

                Tables\Columns\TextColumn::make('start_date')
                    ->date('M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('end_date')
                    ->date('M Y')
                    ->placeholder('Present')
                    ->sortable(),
            ])
            ->defaultSort('start_date', 'desc')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListEducation::route('/'),
            'create' => Pages\CreateEducation::route('/create'),
            'edit'   => Pages\EditEducation::route('/{record}/edit'),
        ];
    }
}
