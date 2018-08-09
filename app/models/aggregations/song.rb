require 'taglib'

class Aggregations::Song
  def save(params)
    song = Song.new(params.permit(:file))
    TagLib::FileRef.open(song.file_path) do |fileref|
      if fileref
        tag = fileref.tag
        song.title = tag.title
        song.artist = tag.artist
        song.album = tag.album
      end
    end
    song.save!
    song
  end
end