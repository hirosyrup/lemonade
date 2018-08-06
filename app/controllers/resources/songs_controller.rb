class Resources::SongsController < ApplicationController
  def index
    @songs = Song.all

    render json: @songs
  end

  def create
    aggregation = Aggregations::Song.new
    @song = aggregation.save(params)

    render json: @song
  end

  def update

  end

  def destroy

  end
end
