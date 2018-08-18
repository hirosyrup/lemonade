class Song < ActiveRecord::Base
  mount_uploader :file, AudioFileUploader

  def file_path
    if Rails.env.production?
      file.url
    else
      file.file.file
    end
  end
end
