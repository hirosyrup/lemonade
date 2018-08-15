require 'taglib'
require 'song'

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

  #
  # 検索
  #
  # @param song_search_option [Forms::SongSearchForm]
  #
  # @return [Array<Aggregations::Item>]
  #
  def self.where_by(song_search_option)
    Song.all
    .tap { |s| break s.artist == song_search_option.artist if song_search_option.artist.present? }
    .tap { |s| break s.album == song_search_option.album if song_search_option.album.present? }
    .tap { |s| break s.group(song_search_option.group_key) if song_search_option.group_key.present? }
  end
end