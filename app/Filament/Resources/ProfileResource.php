<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProfileResource\Pages;
use App\Filament\Resources\ProfileResource\RelationManagers;
use App\Models\Profile;
use App\Models\ProfileSection;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProfileResource extends Resource
{
    protected static ?string $model = Profile::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-circle';

    protected static ?string $navigationGroup = 'Portfolio Content';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Profile Configuration')
                    ->tabs([
                        // -----------------------------------------------------
                        // Tab 1: General Info
                        // -----------------------------------------------------
                        Forms\Components\Tabs\Tab::make('General Information')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Forms\Components\Group::make()
                                    ->schema([
                                        Forms\Components\TextInput::make('name')
                                            ->label('Profile Name (Internal)')
                                            ->required()
                                            ->maxLength(255)
                                            ->placeholder('e.g. Frontend Developer')
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(fn (Forms\Set $set, ?string $state) => 
                                                $set('slug', Str::slug($state))
                                            ),

                                        Forms\Components\TextInput::make('slug')
                                            ->label('URL Slug')
                                            ->required()
                                            ->maxLength(100)
                                            ->unique(ignoreRecord: true)
                                            ->placeholder('e.g. frontend')
                                            ->helperText('Accessible at /profile/{slug}'),

                                        Forms\Components\TextInput::make('title')
                                            ->label('Public Job Title')
                                            ->required()
                                            ->maxLength(255)
                                            ->placeholder('e.g. Senior Frontend Engineer'),

                                        Forms\Components\TextInput::make('tagline')
                                            ->maxLength(255)
                                            ->placeholder('e.g. Building modern web applications'),

                                        Forms\Components\RichEditor::make('about')
                                            ->columnSpanFull()
                                            ->placeholder('Profile bio / about text...'),
                                    ])->columns(2)->columnSpan(2),

                                Forms\Components\Group::make()
                                    ->schema([
                                        Forms\Components\Section::make('Status')
                                            ->schema([
                                                Forms\Components\Toggle::make('is_active')
                                                    ->label('Publicly Active')
                                                    ->default(true)
                                                    ->helperText('Inactive profiles return 404'),

                                                Forms\Components\Toggle::make('is_default')
                                                    ->label('Homepage Default')
                                                    ->default(false)
                                                    ->helperText('Only one profile can be default'),
                                            ]),

                                        Forms\Components\Section::make('Contact Info')
                                            ->schema([
                                                Forms\Components\TextInput::make('location')
                                                    ->placeholder('City, Country'),

                                                Forms\Components\TextInput::make('email')
                                                    ->email()
                                                    ->placeholder('your@email.com'),

                                                Forms\Components\TextInput::make('phone')
                                                    ->tel()
                                                    ->placeholder('+1 234 567 890'),
                                            ]),

                                        Forms\Components\Section::make('Avatar')
                                            ->schema([
                                                Forms\Components\FileUpload::make('avatar')
                                                    ->image()
                                                    ->directory('profiles')
                                                    ->maxSize(2048),
                                            ]),
                                    ])->columnSpan(1),
                            ])->columns(3),

                        // -----------------------------------------------------
                        // Tab 2: SEO Metadata
                        // -----------------------------------------------------
                        Forms\Components\Tabs\Tab::make('SEO & Social')
                            ->icon('heroicon-o-globe-alt')
                            ->schema([
                                Forms\Components\TextInput::make('meta_title')
                                    ->maxLength(255)
                                    ->placeholder('Title tag for search engines'),

                                Forms\Components\Textarea::make('meta_description')
                                    ->rows(3)
                                    ->maxLength(500)
                                    ->placeholder('Meta description for search engines...'),

                                Forms\Components\FileUpload::make('og_image')
                                    ->label('Open Graph Image')
                                    ->image()
                                    ->directory('profiles')
                                    ->maxSize(2048)
                                    ->helperText('Image shown when sharing portfolio link on social media'),
                            ]),

                        // -----------------------------------------------------
                        // Tab 3: Section Visibility & Ordering
                        // -----------------------------------------------------
                        Forms\Components\Tabs\Tab::make('Page Sections')
                            ->icon('heroicon-o-queue-list')
                            ->schema([
                                Forms\Components\Repeater::make('sections')
                                    ->relationship('sections')
                                    ->schema([
                                        Forms\Components\Select::make('section_key')
                                            ->label('Section')
                                            ->options([
                                                'hero'           => 'Hero',
                                                'about'          => 'About',
                                                'skills'         => 'Skills',
                                                'projects'       => 'Projects',
                                                'experience'     => 'Experience',
                                                'education'      => 'Education',
                                                'certifications' => 'Certifications',
                                                'contact'        => 'Contact',
                                            ])
                                            ->required()
                                            ->disableOptionsWhenSelectedInSiblingRepeaterItems(),

                                        Forms\Components\Toggle::make('is_enabled')
                                            ->label('Visible')
                                            ->default(true),

                                        Forms\Components\TextInput::make('sort_order')
                                            ->numeric()
                                            ->default(0)
                                            ->required(),
                                    ])
                                    ->columns(3)
                                    ->orderColumn('sort_order')
                                    ->defaultItems(8)
                                    ->columnSpanFull()
                                    ->helperText('Enable/disable and reorder sections for this profile'),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('avatar')
                    ->circular(),

                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn (Profile $record) => $record->title),

                Tables\Columns\TextColumn::make('slug')
                    ->badge()
                    ->color('gray')
                    ->searchable(),

                Tables\Columns\IconColumn::make('is_default')
                    ->label('Default')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\TextColumn::make('projects_count')
                    ->counts('projects')
                    ->label('Projects'),

                Tables\Columns\TextColumn::make('skills_count')
                    ->counts('skills')
                    ->label('Skills'),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active Status'),
                Tables\Filters\TernaryFilter::make('is_default')
                    ->label('Default Profile'),
            ])
            ->actions([
                // 1. Preview Action
                Tables\Actions\Action::make('preview')
                    ->icon('heroicon-o-eye')
                    ->color('info')
                    ->url(fn (Profile $record) => url("/profile/{$record->slug}"))
                    ->openUrlInNewTab(),

                // 2. Set as Default Action
                Tables\Actions\Action::make('set_default')
                    ->label('Set Default')
                    ->icon('heroicon-o-star')
                    ->color('warning')
                    ->hidden(fn (Profile $record) => $record->is_default)
                    ->requiresConfirmation()
                    ->action(function (Profile $record) {
                        DB::transaction(function () use ($record) {
                            Profile::query()->update(['is_default' => false]);
                            $record->update(['is_default' => true]);
                        });

                        Notification::make()
                            ->title("Profile '{$record->name}' set as homepage default!")
                            ->success()
                            ->send();
                    }),

                // 3. Duplicate Action (Spec Section 29)
                Tables\Actions\Action::make('duplicate')
                    ->icon('heroicon-o-document-duplicate')
                    ->color('secondary')
                    ->form([
                        Forms\Components\TextInput::make('name')
                            ->label('New Profile Name')
                            ->required()
                            ->default(fn (Profile $record) => $record->name . ' (Copy)')
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Forms\Set $set, ?string $state) => 
                                $set('slug', Str::slug($state))
                            ),

                        Forms\Components\TextInput::make('slug')
                            ->label('New URL Slug')
                            ->required()
                            ->default(fn (Profile $record) => $record->slug . '-copy')
                            ->unique('profiles', 'slug'),
                    ])
                    ->action(function (Profile $record, array $data) {
                        DB::transaction(function () use ($record, $data) {
                            // 1. Duplicate profile attributes
                            $newProfile = Profile::create([
                                'name'             => $data['name'],
                                'slug'             => $data['slug'],
                                'title'            => $record->title,
                                'tagline'          => $record->tagline,
                                'about'            => $record->about,
                                'location'         => $record->location,
                                'email'            => $record->email,
                                'phone'            => $record->phone,
                                'avatar'           => $record->avatar,
                                'meta_title'       => $record->meta_title,
                                'meta_description' => $record->meta_description,
                                'og_image'         => $record->og_image,
                                'is_default'       => false,
                                'is_active'        => true,
                            ]);

                            // 2. Duplicate sections
                            foreach ($record->sections as $sec) {
                                ProfileSection::create([
                                    'profile_id'  => $newProfile->id,
                                    'section_key' => $sec->section_key,
                                    'is_enabled'  => $sec->is_enabled,
                                    'sort_order'  => $sec->sort_order,
                                ]);
                            }

                            // 3. Duplicate profile_project relationships
                            $projectsData = [];
                            foreach ($record->projects as $proj) {
                                $projectsData[$proj->id] = [
                                    'sort_order'  => $proj->pivot->sort_order,
                                    'is_featured' => $proj->pivot->is_featured,
                                ];
                            }
                            $newProfile->projects()->attach($projectsData);

                            // 4. Duplicate profile_skill relationships
                            $skillsData = [];
                            foreach ($record->skills as $sk) {
                                $skillsData[$sk->id] = [
                                    'sort_order'  => $sk->pivot->sort_order,
                                    'is_featured' => $sk->pivot->is_featured,
                                ];
                            }
                            $newProfile->skills()->attach($skillsData);

                            // 5. Duplicate profile_experience relationships
                            $expData = [];
                            foreach ($record->experiences as $exp) {
                                $expData[$exp->id] = [
                                    'sort_order' => $exp->pivot->sort_order,
                                ];
                            }
                            $newProfile->experiences()->attach($expData);
                        });

                        Notification::make()
                            ->title("Profile duplicated as '{$data['name']}'!")
                            ->success()
                            ->send();
                    }),

                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\ProjectsRelationManager::class,
            RelationManagers\SkillsRelationManager::class,
            RelationManagers\ExperiencesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListProfiles::route('/'),
            'create' => Pages\CreateProfile::route('/create'),
            'edit'   => Pages\EditProfile::route('/{record}/edit'),
        ];
    }
}
