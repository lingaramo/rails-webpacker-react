require 'rails_helper'

RSpec.describe "Admin" do
  let!(:admin) { Fabricate(:user, role: :admin) }
  let!(:manager) { Fabricate(:user, role: :manager) }
  let!(:user) { Fabricate(:user, role: :user) }

  def login(agent)
    visit '/sign_in'
    fill_in :email, with: agent.email
    fill_in :password, with: agent.password
    click_on 'Sign in'
  end

  describe "viewing a list of users" do
    specify "can see users with any role" do
      login(admin)
      visit '/admin'
      [admin, manager, user].each do |u|
        expect(page).to have_content(u.email)
      end
    end

    specify "can delete users" do
      login(admin)
      visit '/admin'
      within("//*[@id='#{manager.id}']") do
        page.accept_confirm do
          click_on "Delete"
        end
      end
      expect(page).not_to have_content(manager.email)
      expect(User.find_by(email: manager.email)).to eq(nil)
    end

    # specify "can edit users" do
    #   within("//*[@id='#{manager.id}']") do
    #     click_on "Edit"
    #   end
    # end
  end
end
