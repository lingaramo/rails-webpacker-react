module AuthenticationHelper
  def self.authentication_headers_for(user)
    user.create_new_auth_token
  end
end
