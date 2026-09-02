<?php

namespace App\Filament\Resources\ProjectResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class MediaRelationManager extends RelationManager
{
    protected static string $relationship = 'media';

    protected static ?string $title = 'Project Gallery';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\FileUpload::make('file_path')
                ->label('Image')
                ->image()
                ->disk('public')
                ->directory('projects/gallery')
                ->maxSize(4096)
                ->required()
                ->columnSpanFull(),

            Forms\Components\Hidden::make('media_type')
                ->default('image'),

            Forms\Components\TextInput::make('alt_text')
                ->label('Alternative Text')
                ->maxLength(255)
                ->helperText('Describe the image for accessibility.'),

            Forms\Components\TextInput::make('caption')
                ->maxLength(255),

            Forms\Components\TextInput::make('sort_order')
                ->numeric()
                ->default(0)
                ->required(),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('caption')
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                Tables\Columns\ImageColumn::make('file_path')
                    ->disk('public')
                    ->label('Preview')
                    ->square(),

                Tables\Columns\TextColumn::make('caption')
                    ->placeholder('No caption')
                    ->searchable(),

                Tables\Columns\TextColumn::make('alt_text')
                    ->label('Alt text')
                    ->limit(50),

                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable(),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
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
}
