class Song < ActiveRecord::Base
  mount_uploader :file, AudioFileUploader

  #
  # @return [String]
  #
  def file_path
    file.try(:file).try(:file)
  end
end
