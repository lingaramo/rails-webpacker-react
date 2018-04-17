require 'rails_helper'

RSpec.describe "Requests on USER resource" do
  let!(:admin1)                  { Fabricate(:user, role: "admin") }
  let!(:admin2)                  { Fabricate(:user, role: "admin") }
  let!(:manager1)                { Fabricate(:user, role: "manager") }
  let!(:manager2)                { Fabricate(:user, role: "manager") }
  let!(:user1)                  { Fabricate(:user) }
  let!(:user2)                  { Fabricate(:user) }

  headers = {
    "ACCEPT" => "application/json",
  }

  def authentication_headers_for(user)
    AuthenticationHelper.authentication_headers_for(user)
  end

  def data_payload(name: nil, password: nil, email: nil, role: nil)
    password = password || Faker::Internet.password(8)
    {
      user: {
          name: name || Faker::Name.name,
          password: password,
          password_confirmation: password,
          email: email || Faker::Internet.unique.email,
          role: role || 'user'
      }
    }
  end

  describe "as admin" do
    it "can get a complete list of users (#index)" do
      get api_v1_user_index_path, headers: headers.merge(authentication_headers_for(admin1))
      expect(response).to have_http_status(200)
      expect(response.body).to eq(UserSerializer.new(User.all).serialized_json)
    end

    it "can create new users with any role" do
      ['user', 'manager', 'admin'].each do |role|
        payload = data_payload(role: role)
        expect(User.find_by(email: payload[:user][:email])).to be(nil)
        expect {
          post api_v1_user_index_path,
            params: payload,
            headers: headers.merge(authentication_headers_for(admin1))
        }.to change { User.count }.by(+1)
        expect(User.find_by(email: payload[:user][:email])).not_to be(nil)
        expect(response).to have_http_status(201)
        expect(response.body).to eq(
        UserSerializer.new(User.find_by(email: payload[:user][:email])).serialized_json)
      end
    end

    it "can update any user with any role" do
      [admin2, manager1, user1].each do |user_to_update|
        payload = data_payload
        patch api_v1_user_path(user_to_update),
          params: payload,
          headers: headers.merge(authentication_headers_for(admin1))
        expect(response).to have_http_status(200)
        expect(user_to_update.reload.name).to eq(payload[:user][:name])
        expect(user_to_update.email).to eq(payload[:user][:email])
        expect(user_to_update.role).to eq(payload[:user][:role])
      end
    end

    it "can update role" do
      [manager1, user1].each do |user_to_update|
        payload = data_payload(role: 'admin')
        patch api_v1_user_path(user_to_update),
          params: payload,
          headers: headers.merge(authentication_headers_for(admin1))
        expect(response).to have_http_status(200)
        expect(user_to_update.reload.name).to eq(payload[:user][:name])
        expect(user_to_update.email).to eq(payload[:user][:email])
        expect(user_to_update.role).to eq(payload[:user][:role])
      end

      patch api_v1_user_path(admin2),
        params: data_payload(role: 'user'),
        headers: headers.merge(authentication_headers_for(admin1))
      expect(response).to have_http_status(200)
    end

    it "can view any user (#show)" do
      [admin2, manager1, user1].each do |user|
        get api_v1_user_path(user), headers: headers.merge(authentication_headers_for(admin1))
        expect(response).to have_http_status(200)
        expect(response.body).to eq(UserSerializer.new(User.find(user.id)).serialized_json)
      end
    end

    # it "can delete any user" do
    #   [admin2, manager1, user1].each do |user|
    #     delete api_v1_user_path(user), headers: headers.merge(authentication_headers_for(admin1))
    #     expect(response).to have_http_status(204)
    #   end
    # end
  end

  describe "as manager" do
    it "can get a complete list of user, except for users with admin or manager role (#index)" do
      get api_v1_user_index_path, headers: headers.merge(authentication_headers_for(manager1))
      expect(response).to have_http_status(200)
      expect(response.body).to eq(UserSerializer.new(User.where.not(role: ['manager', 'admin'])).serialized_json)
    end

    it "can create new regular users, but not others managers or admin" do
      ['manager', 'admin'].each do |role|
        payload = data_payload(role: role)
        expect(User.find_by(email: payload[:user][:email])).to be(nil)
        expect {
          post api_v1_user_index_path,
            params: payload,
            headers: headers.merge(authentication_headers_for(manager1))
        }.to change { User.count }.by(0)
        expect(response).to have_http_status(403)
      end

      payload = data_payload(role: 'user')
      expect(User.find_by(email: payload[:user][:email])).to be(nil)
      expect {
        post api_v1_user_index_path,
          params: payload,
          headers: headers.merge(authentication_headers_for(manager1))
      }.to change { User.count }.by(+1)
      expect(User.find_by(email: payload[:user][:email])).not_to be(nil)
      expect(response).to have_http_status(201)
      expect(JSON.parse(response.body)["data"]["attributes"]["role"]).to eq('user')
    end

    it "can update regular users, but not others managers or admin" do
      [admin1, manager2].each do |user_to_update|
        patch api_v1_user_path(user_to_update),
          params: data_payload,
          headers: headers.merge(authentication_headers_for(manager1))
        expect(response).to have_http_status(403)
      end

      payload = data_payload
      patch api_v1_user_path(user1),
        params: payload,
        headers: headers.merge(authentication_headers_for(manager1))
      expect(response).to have_http_status(200)
      expect(user1.reload.name).to eq(payload[:user][:name])
      expect(user1.email).to eq(payload[:user][:email])
      expect(user1.role).to eq(payload[:user][:role])
    end

    it "can't update role" do
      patch api_v1_user_path(user1),
        params: data_payload(role: 'manager'),
        headers: headers.merge(authentication_headers_for(manager1))
      expect(response).to have_http_status(403)

      patch api_v1_user_path(user1),
        params: data_payload(role: 'admin'),
        headers: headers.merge(authentication_headers_for(manager1))
      expect(response).to have_http_status(403)
    end

    it "can't view other users with manager or admin role (#show)" do
      [admin2, manager2].each do |user|
        get api_v1_user_path(user), headers: headers.merge(authentication_headers_for(manager1))
        expect(response).to have_http_status(403)
      end
    end

    it "can view users with regular user role (#show)" do
      [manager1, user1].each do |user|
        get api_v1_user_path(user), headers: headers.merge(authentication_headers_for(manager1))
        expect(response).to have_http_status(200)
        expect(response.body).to eq(UserSerializer.new(User.find(user.id)).serialized_json)
      end
    end

    # it "can delete users regular user role" do
    #   [admin1, manager2].each do |user|
    #     delete api_v1_user_path(user), headers: headers.merge(authentication_headers_for(manager1))
    #     expect(response).to have_http_status(401)
    #   end
    #
    #   delete api_v1_user_path(user1), headers: headers.merge(authentication_headers_for(manager1))
    #   expect(response).to have_http_status(204)
    # end
  end

  describe "as user" do
    it "can't create a new user" do
      expect {
        post api_v1_user_index_path, params: data_payload, headers: headers.merge(authentication_headers_for(user1))
      }.not_to change { User.count }
      expect(response).to have_http_status(403)
    end

    it "can update it's own data" do
      payload = data_payload
      patch api_v1_user_path(user1),
        params: payload,
        headers: headers.merge(authentication_headers_for(user1))
      expect(response).to have_http_status(200)
      expect(user1.reload.name).to eq(payload[:user][:name])
      expect(user1.email).to eq(payload[:user][:email])
      expect(user1.role).to eq(payload[:user][:role])
    end

    it "can't update others users data" do
      patch api_v1_user_path(user2),
        params: data_payload,
        headers: headers.merge(authentication_headers_for(user1))
      expect(response).to have_http_status(403)
    end

    it "can view its own data (#show)" do
      get api_v1_user_path(user1),
        params: data_payload,
        headers: headers.merge(authentication_headers_for(user1))
      expect(response).to have_http_status(200)
      expect(response.body).to eq(UserSerializer.new(user1).serialized_json)
    end

    it "can't view others users data (#show)" do
      get api_v1_user_path(user2),
        params: data_payload,
        headers: headers.merge(authentication_headers_for(user1))
      expect(response).to have_http_status(403)
    end

    # it "can't delete other users" do
    #   delete api_v1_user_path(user2), headers: headers.merge(authentication_headers_for(user1))
    #   expect(response).to have_http_status(401)
    # end
  end
end
