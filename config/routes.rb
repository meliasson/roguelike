Rails.application.routes.draw do
  root 'start#index'

  namespace :api do
    resources :game, only: [:create, :update]
  end
end
