class Api::V1::UserController < ApiController
  def index
    users = policy_scope(User)
    render json: UserSerializer.new(users).serialized_json
  end

  def update
    user = User.find(params[:id])
    authorize(user)
    if user.update(permitted_attributes)
      render json: UserSerializer.new(user).serialized_json
    else
      respond_with_errors(user)
    end
  end

  private

  def permitted_attributes
    raise Pundit::NotAuthorizedError if params[:user].include?(:role) and !current_user.admin? and params[:user][:role] != 'user'
    params.require(:user).permit(policy(:user).permitted_attributes)
  end
end
