class Song < ActiveRecord::Base
  mount_uploader :file, AudioFileUploader

  def file_path
    file.try(:file).try(:file)
  end
end
