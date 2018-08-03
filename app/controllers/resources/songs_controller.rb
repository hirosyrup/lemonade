class Resources::SongsController < ApplicationController
  def index
    @songs = Song.all

    respond_to do |format|
      format.json
    end
  end

  def create
    aggregation = Aggregations::Song.new
    aggregation.save(params)

    redirect_to music_player_path
  end

  def update

  end

  def destroy

  end
end
