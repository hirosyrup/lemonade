class MusicPlayerController < ApplicationController
  def index
    @song = Song.new(file: '')
  end
end
