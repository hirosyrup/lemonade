require 'taglib'

class MusicPlayerController < ApplicationController
  def index
    TagLib::FileRef.open("#{Rails.public_path}/songs/nerve.m4a") do |fileref|
      if fileref
        tag = fileref.tag
        tag.title   #=> "Wake Up"
        tag.artist  #=> "Arcade Fire"
        tag.album   #=> "Funeral"
        tag.year    #=> 2004
        tag.track   #=> 7
        tag.genre   #=> "Indie Rock"
        tag.comment #=> nil

        properties = fileref.audio_properties
        properties.length  #=> 335 (song length in seconds)
      end
    end  # File is automatically closed at block end
  end
end
