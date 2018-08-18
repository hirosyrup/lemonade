namespace :delete_songs do
  task execute: :environment do
    Aggregations::Song.new.delete_all_without_demo_songs
  end
end
