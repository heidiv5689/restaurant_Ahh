Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    resources :restaurants do
      resources :reservations 
      get '/unenrolled', to: 'reservations#unenrolled
      Users'
      get '/enrolled', to: 'reservations#enrolledUsers'
      get '/restaurantUsers', to: 'restaurants#restaurantUsers'
    end

    resources :users do
      get '/userRestaurants', to: 'users#userRestaurants'
      end
  end
end
