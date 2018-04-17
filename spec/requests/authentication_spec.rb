require 'rails_helper'

describe "User registration" do
  it "can't specify role" do
    user_email = "user@user.com"
    expect {
      post user_registration_path({email: user_email, password: 12345678, password_confirmation: 12345678, name: "John Doe", role: "admin"})
    }.to change{ User.count }.by(+1)

    expect(response).to have_http_status(:success)

    response_body = JSON.parse(response.body)
    expect(response_body["data"]["email"]).to eq(user_email)
    expect(User.find_by(email: user_email).role).to eq("user")
  end

  it "can't chage it's role by updating registration" do
    email, password, name, new_name = "user@user.com", 12345678, "name", "new_name"
    user = User.create!(email: email, password: password, password_confirmation: password, name: name)
    expect {
      put user_registration_path({email: email, current_password: password, name: new_name}), headers: user.create_new_auth_token
    }.to change{ user.reload.name }.from(name).to(new_name)
    expect {
      put user_registration_path({email: email, current_password: password, role: "admin"}), headers: user.create_new_auth_token
    }.not_to change{ user.reload.role }
  end
end
