class SongSearchForm
  attr_reader :artist
  attr_reader :album
  attr_reader :group_key
  attr_reader :uuid

  #
  # パラメータから生成する
  #
  # @param params [Hash]
  # @param uuid [String]
  #
  # @return [Forms::SongSearchForm]
  #
  def self.from_params(params, uuid)
    new(
        artist: params[:artist],
        album: params[:album],
        group_key: params[:group_key],
        uuid: uuid,
        )
  end

  #
  # 初期化メソッド
  #
  # @param artist [String] アーティスト名
  # @param album [String] アルバム名
  # @param group_key [String] グルーピングするキー名
  # @param uuid [String] ユーザUUID
  #
  def initialize(
      artist: nil,
      album: nil,
      group_key: nil,
      uuid: nil
  )
    @artist = artist
    @album = album
    @group_key = group_key
    @uuid = uuid
  end
end