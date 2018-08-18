if Rails.env.production?
  CarrierWave.configure do |config|
    config.fog_credentials = {
        provider: 'AWS',
        aws_access_key_id: 'AKIAIDLRYMHXURJZV2GQ',
        aws_secret_access_key: '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',
        region: 'ap-northeast-1'
    }

    config.fog_directory = 'rails-audio'
    config.cache_storage = :fog
  end
end