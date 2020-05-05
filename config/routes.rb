Rails.application.routes.draw do
  devise_for :users
  root to: 'transportation_footprint#index'
  get 'transportation_footprint', to: 'transportation_footprint#index'
  post 'transportation_footprint', to: 'transportation_footprint#save_transportation_footprint'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
