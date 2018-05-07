require 'rails_helper'

RSpec.describe "User" do
  specify "sign up" do
    visit '/sign_up'
    fill_in :name,                  with: name = Faker::Name.name
    fill_in :email,                 with: email = Faker::Internet.email
    fill_in :password,              with: password = 12345678
    fill_in :password_confirmation, with: password
    expect(User.find_by(email: email)).to eq(nil)
    click_on "Sign up"
    expect(User.find_by(email: email)).not_to eq(nil)
  end

  specify "sign in" do
    visit '/sign_in'
    user = Fabricate(:user)
    fill_in :email,                 with: user.email
    fill_in :password,              with: user.password
    expect {
      click_on 'Sign in'
    }.to change{ current_path }
  end
end
