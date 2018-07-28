class Resources::SongsController < ApplicationController
  def index
    @songs = Song.all

    respond_to do |format|
      format.json
    end
  end

  def create

  end

  def update

  end

  def destroy

  end
end
