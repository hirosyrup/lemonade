class Concerns::Error
  def initialize(exception)
    @exception = exception
  end

  def create
    { message: @exception.message }
  end

  def status_code
    ActionDispatch::ExceptionWrapper.new(Rails.env, @exception).status_code
  end
end