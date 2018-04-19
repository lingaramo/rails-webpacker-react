class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from ActionController::RoutingError, with: :route_not_found

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end

  private

  def route_not_found
    redirect_to("/not_found")
  end
end
