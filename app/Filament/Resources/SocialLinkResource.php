<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SocialLinkResource\Pages;
use App\Models\SocialLink;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SocialLinkResource extends Resource
{
    protected static ?string $model = SocialLink::class;

    protected static ?string $navigationIcon = 'heroicon-o-link';

    protected static ?string $navigationGroup = 'Portfolio Content';

    protected static ?int $navigationSort = 7;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Social Link Details')
                    ->schema([
                        Forms\Components\Select::make('platform')
                            ->required()
                            ->options([
                                'github'    => 'GitHub',
                                'linkedin'  => 'LinkedIn',
                                'email'     => 'Email',
                                'twitter'   => 'Twitter / X',
                                'instagram' => 'Instagram',
                                'youtube'   => 'YouTube',
                                'website'   => 'Website',
                                'other'     => 'Other',
                            ])
                            ->live()
                            ->afterStateUpdated(function (Forms\Set $set, ?string $state) {
                                if ($state && $state !== 'other') {
                                    $set('label', ucfirst($state));
                                    $set('icon', strtolower($state));
                                }
                            }),

                        Forms\Components\TextInput::make('label')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('url')
                            ->required()
                            ->maxLength(255)
                            ->label('URL')
                            ->placeholder('https://github.com/username or mailto:user@example.com'),

                        Forms\Components\TextInput::make('icon')
                            ->placeholder('e.g. github, linkedin, mail')
                            ->maxLength(100),

                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->required(),

                        Forms\Components\Toggle::make('is_active')
                            ->default(true)
                            ->required(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),

                Tables\Columns\TextColumn::make('platform')
                    ->badge()
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('label')
                    ->searchable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('url')
                    ->limit(30)
                    ->url(fn ($record) => $record->url, true)
                    ->icon('heroicon-o-arrow-top-right-on-square'),

                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->sortable(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
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
            'index'  => Pages\ListSocialLinks::route('/'),
            'create' => Pages\CreateSocialLink::route('/create'),
            'edit'   => Pages\EditSocialLink::route('/{record}/edit'),
        ];
    }
}
