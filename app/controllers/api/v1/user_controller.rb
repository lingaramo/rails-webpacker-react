class Api::V1::UserController < ApiController
  def index
    users = policy_scope(User.search_by(params[:search])).paginate(
      page: params.dig(:page, :number),
      per_page: params.dig(:page, :page_size)
    )
    render json: users
  end

  def create
    user = User.new(permitted_attributes)
    authorize(user)
    if user.save
      render json: UserSerializer.new(user).serialized_json, status: :created
    else
      respond_with_errors(user)
    end
  end

  def show
    user = User.find(params[:id])
    authorize(user)
    render json: user
  end

  def update
    user = User.find(params[:id])
    authorize(user)
    if user.update(permitted_attributes)
      render json: user
    else
      respond_with_errors(user)
    end
  end

  def destroy
    user = User.find(params[:id])
    authorize(user)
    user.destroy
  end

  private

  def permitted_attributes
    raise Pundit::NotAuthorizedError if params[:user].include?(:role) and !current_user.admin? and params[:user][:role] != 'user'
    params.require(:user).permit(policy(:user).permitted_attributes)
  end
end
