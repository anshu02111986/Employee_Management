# frozen_string_literal: true

Rails.application.routes.draw do
  root 'personal_data#index'
  resources :personal_data
  resources :employments, only: %i[new create] do
    member do
      post :add_employment
    end
  end
end
