require 'taglib'
require 'song'

class Aggregations::Song
  DEMO_SONG_UUID = 'e1e73245-cb27-4da1-ad0b-c0464f3886e5'.freeze

  class InvalidFile < StandardError; end

  #
  # @param params [Hash]
  #
  def save(params)
    song = Song.new(params.permit(:file))
    raise InvalidFile.new('The file is not .m4a or over 10 megabytes.') unless song.file_path

    song.uuid = params[:uuid]
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
  # @param song_search_option [Forms::SongSearchForm]
  #
  # @return [Array<Song>]
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
  #
  #
  def delete_all_without_demo_songs
    Song.where.not(uuid: DEMO_SONG_UUID).each { |s| s.destroy! }
  end

  #
  # @param songs [Array<Song>]
  #
  # @return [Hash]
  #
  def add_file_url_to_songs_as_hash(songs)
    songs.map do |s|
      if s.uuid == DEMO_SONG_UUID
        file_url = "https://s3-ap-northeast-1.amazonaws.com/rails-audio#{s.file_url}"
      else
        file_url = s.file_url
      end
      hash = s.attributes
      hash[:file_url] = file_url
      hash
    end
  end
end