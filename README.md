# README

 $ rails new rails-webpacker-react --database=postgresql -T --skip-active-storage -C --webpack=react
 $ rails db:create

 Add gem: gem 'devise_token_auth'
 $ bundle install
 $ rails g devise_token_auth:install User auth
 $ rails db:migrate

 Config Devise.setup do |config| consig.password_length = 8...128 end

 Add gems.
 gem 'pundit'
 gem 'pry-rails'
 gem 'fast_jsonapi'
 $ bundle install
 $ rails g pundit:install

 # Generate user policy
 $ rails g pundit:policy user


 # Generate user serializer.
 $ rails g serializer User name email id role


 # RSpec
 Add gem 'rspec-rails', '~> 3.6' to development-test group
 gem 'fabrication'
 gem 'faker'
 $ bundle install
 $ rails generate rspec:install


This README would normally document whatever steps are necessary to get the

application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
