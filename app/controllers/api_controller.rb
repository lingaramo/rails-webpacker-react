class ApiController < ActionController::API
  include Pundit
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ApiErrorResponder

  respond_to :json
  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  private

  def render_unprocessable_entity_response(exception)
    binding.pry
    render json: exception.record.errors, status: :unprocessable_entity
  end

  def user_not_authorized(exception)
    binding.pry
    render json: "Forbidden", status: 403
  end

  def record_not_found(exception)
    binding.pry
    render json: { error: exception.message }, status: 404
  end
end
