class Api::V1::UserController < ApiController

  def index
    users = policy_scope(User)
    render json: UserSerializer.new(users).serialized_json
  end
end
