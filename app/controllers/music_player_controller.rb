class MusicPlayerController < ApplicationController
  def index
  end

  def songs
    @songs = Song.all
    @songs = @songs.group_by{ |s| s.artist }.values
    @songs = @songs.map do |s|
      s.group_by { |s_c| s_c.album }.values
    end

    render json: @songs
  end
end
