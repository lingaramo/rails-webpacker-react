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
 $ bundle install 
 $ rails g pundit:install





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
