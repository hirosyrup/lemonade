class MusicPlayerController < ApplicationController
  def index
  end

  def songs
    @songs = Aggregations::Song.new.where_by(SongSearchForm.from_params(params))

    render json: @songs
  end
end
