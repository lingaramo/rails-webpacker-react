Fabricator(:user) do
  name { Faker::Name.name }
  email { Faker::Internet.unique.email }
  pass = Faker::Internet.password(8)
  password { pass }
  password_confirmation { pass }
end
