Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '*path', to: "app#index", constraints: lambda { |req| req.format == :html }

  namespace :api do
    namespace :v1 do
      resources :user, only: [:index, :update, :create, :show, :destroy]
    end
  end
end
