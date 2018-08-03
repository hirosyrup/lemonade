class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|

      t.string :title, default: ''
      t.string :album, default: ''
      t.string :artist, default: ''

      t.timestamps null: false
    end
  end
end
