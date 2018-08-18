require 'taglib'
require 'song'

class Aggregations::Song
  DEMO_SONG_UUID = 'e1e73245-cb27-4da1-ad0b-c0464f3886e5'.freeze

  def save(params)
    song = Song.new(params.permit(:file))
    song.uuid = params[:uuid]
    song.save!
    TagLib::FileRef.open(song.file_path) do |fileref|
      if fileref
        tag = fileref.tag
        song.title = tag.title.present? ? tag.title : 'Unknown Title'
        song.artist = tag.artist.present? ? tag.artist : 'Unknown Artist'
        song.album = tag.album.present? ? tag.album : 'Unknown Album'
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
    return [] if song_search_option.uuid.blank?
    Song.all
        .tap {|ss| break ss.where(uuid: [song_search_option.uuid, DEMO_SONG_UUID])}
        .tap {|ss| break ss.where(artist: song_search_option.artist) if song_search_option.artist.present?}
        .tap {|ss| break ss.where(album: song_search_option.album) if song_search_option.album.present?}
        .tap {|ss| break ss.group(song_search_option.group_key) if song_search_option.group_key.present?}
  end

  #
  # デモ曲以外を削除する
  #
  def delete_all_without_demo_songs
    Song.where.not(uuid: DEMO_SONG_UUID).each { |s| s.destroy! }
  end
end