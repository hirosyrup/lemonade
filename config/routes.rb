Rails.application.routes.draw do
  get '', to: 'music_player#index'
  get 'music_player', to: 'music_player#index'
  get 'music_player/uuid'
  get 'music_player/songs'
  get 'upload_demo_songs', to: 'music_player#upload_demo_songs'
  namespace :resources do
    get 'songs/index'
    post 'songs/create'
    get 'songs/update'
    get 'songs/destroy'
  end
end
