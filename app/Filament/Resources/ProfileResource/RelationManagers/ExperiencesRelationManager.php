<?php

namespace App\Filament\Resources\ProfileResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class ExperiencesRelationManager extends RelationManager
{
    protected static string $relationship = 'experiences';

    protected static ?string $recordTitleAttribute = 'company';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('company')
                    ->disabled(),

                Forms\Components\TextInput::make('position')
                    ->disabled(),

                Forms\Components\TextInput::make('sort_order')
                    ->numeric()
                    ->default(0)
                    ->required()
                    ->helperText('Ordering position for this profile'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('company')
            ->columns([
                Tables\Columns\TextColumn::make('company')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('position')
                    ->searchable(),

                Tables\Columns\TextColumn::make('pivot.sort_order')
                    ->label('Order')
                    ->sortable(),
            ])
            ->defaultSort('pivot.sort_order')
            ->reorderable('pivot.sort_order')
            ->filters([])
            ->headerActions([
                Tables\Actions\AttachAction::make()
                    ->preloadRecordSelect()
                    ->form(fn (Tables\Actions\AttachAction $action): array => [
                        $action->getRecordSelect(),
                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->required(),
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DetachAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DetachBulkAction::make(),
                ]),
            ]);
    }
}
