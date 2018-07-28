Rails.application.routes.draw do
  namespace :resources do
    get 'songs/index'
    get 'songs/create'
    get 'songs/update'
    get 'songs/destroy'
  end
end
