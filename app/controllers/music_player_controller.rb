class MusicPlayerController < ApplicationController
  def index
  end

  def songs
    songs = Song.all
    @songs = songs.group(:artist)

    render json: @songs
  end
end
