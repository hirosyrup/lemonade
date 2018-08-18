class AddToUuidToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :uuid, :string, null: false, after: :id
  end
end
