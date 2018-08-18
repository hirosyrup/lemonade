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
  def where_by(song_search_option)
    Song.all
    .tap { |ss| break ss.where(artist: song_search_option.artist) if song_search_option.artist.present? }
    .tap { |ss| break ss.where(album: song_search_option.album) if song_search_option.album.present? }
    .tap { |ss| break ss.group(song_search_option.group_key) if song_search_option.group_key.present? }
  end

  #
  # デモ曲以外を削除する
  #
  def delete_all_without_demo_songs
    Song.all.each { |s| s.destroy! }
  end
end