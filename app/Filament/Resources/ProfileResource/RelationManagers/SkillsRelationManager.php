<?php

namespace App\Filament\Resources\ProfileResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class SkillsRelationManager extends RelationManager
{
    protected static string $relationship = 'skills';

    protected static ?string $recordTitleAttribute = 'name';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->disabled()
                    ->columnSpanFull(),

                Forms\Components\TextInput::make('sort_order')
                    ->numeric()
                    ->default(0)
                    ->required()
                    ->helperText('Ordering position for this profile'),

                Forms\Components\Toggle::make('is_featured')
                    ->label('Featured Skill')
                    ->default(false),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('category')
                    ->badge(),

                Tables\Columns\TextColumn::make('pivot.sort_order')
                    ->label('Order')
                    ->sortable(),

                Tables\Columns\IconColumn::make('pivot.is_featured')
                    ->label('Featured')
                    ->boolean(),
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
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Featured Skill')
                            ->default(false),
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
