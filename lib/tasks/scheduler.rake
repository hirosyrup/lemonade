desc "This task is called by the Heroku scheduler add-on"
task delete_songs: :environment do
  Aggregations::Song.new.delete_all_without_demo_songs
end
