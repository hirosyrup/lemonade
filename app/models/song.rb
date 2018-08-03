class Song < ActiveRecord::Base
  mount_uploader :file, AudioFileUploader

  def file_path
    file.file.file
  end
end
