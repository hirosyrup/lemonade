Rails.application.routes.draw do
  get 'music_player', to: 'music_player#index'
  namespace :resources do
    get 'songs/index'
    get 'songs/create'
    get 'songs/update'
    get 'songs/destroy'
  end
end
