class Resources::SongsController < ApplicationController
  def create
    aggregation = Aggregations::Song.new
    @song = aggregation.save(params)

    render json: @song
  rescue => e
    error = Concerns::Error.new(e)
    render json: error.create, status: error.status_code
  end

  def update

  end

  def destroy

  end
end
