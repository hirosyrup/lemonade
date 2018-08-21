class Concerns::Error
  #
  # @param exception [StandardError]
  #
  def initialize(exception)
    @exception = exception
  end

  #
  # @return [Hash]
  #
  def create
    { message: @exception.message }
  end

  #
  # @return [String]
  #
  def status_code
    ActionDispatch::ExceptionWrapper.new(Rails.env, @exception).status_code
  end
end