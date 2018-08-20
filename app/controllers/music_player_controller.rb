class MusicPlayerController < ApplicationController
  def index
    session[:uuid] = SecureRandom.uuid unless session[:uuid]
  end

  def uuid
    render json: {uuid: session[:uuid]}
  end

  def songs
    aggregation = Aggregations::Song.new
    @songs = aggregation.where_by(SongSearchForm.from_params(params))

    render json: aggregation.add_file_url_to_songs_as_hash(@songs)
  end

  def upload_demo_songs
    @uuid = Aggregations::Song::DEMO_SONG_UUID
  end
end
