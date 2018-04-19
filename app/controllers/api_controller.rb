class ApiController < ActionController::API
  include Pundit
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ApiErrorResponder

  respond_to :json
  before_action :authenticate_user!

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActionController::RoutingError, with: :route_not_found

  private

  def user_not_authorized(exception)
    render json: "Forbidden", status: 403
  end

  def record_not_found(exception)
    render json: { error: exception.message }, status: 404
  end

  def route_not_found
    redirect_to("/not_found")
  end
end
