class SongSearchForm
  attr_reader :artist
  attr_reader :album
  attr_reader :group_key


  #
  # パラメータから生成する
  #
  # @param params [Hash]
  #
  # @return [Forms::SongSearchForm]
  #
  def self.from_params(params)
    new(
        artist: params[:artist],
        album: params[:album],
        group_key: params[:group_key],
        )
  end

  #
  # 初期化メソッド
  #
  # @param artist [String] アーティスト名
  # @param album [String] アルバム名
  # @param group_key [String] グルーピングするキー名
  #
  def initialize(
      artist: nil,
      album: nil,
      group_key: nil
  )
    @artist = artist
    @album = album
    @group_key = group_key
  end
end