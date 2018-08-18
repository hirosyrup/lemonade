class MusicPlayerController < ApplicationController
  def index
    session[:uuid] = SecureRandom.uuid unless session[:uuid]
  end

  def uuid
    render json: {uuid: session[:uuid]}
  end

  def songs
    @songs = Aggregations::Song.new.where_by(SongSearchForm.from_params(params))

    render json: @songs
  end
end
