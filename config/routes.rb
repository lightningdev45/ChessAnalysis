EngineEval::Application.routes.draw do
  devise_for :users,:controllers => {:registrations => "registrations",:sessions=>"sessions",:passwords=>"passwords"}
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
devise_scope :user do
  get '/users/current'=>"sessions#current"
end
  resources :positions do
    collection {get :update_evaluation}
  end

resources :annotations
resources :annotation_edits
get "/position/:position_fen"=>"home#index"

get '/evaluations_index'=>'evaluations#evaluations_index'
resources :evaluations


get '/get_annotation_data'=>'annotations#get_annotation_data'
resources :games
resources :interest_emails
resources :dpositions
resources :game_positions
resources :annotation_quality_votes
resources :relationships
get 'about'=>"home#about"
get 'clean_database'=>'games#clean_database'
get '/how_to'=>"home#how_to"
get '/support'=>"home#support"
get '/user/:id'=>"home#user",as: :user
get '/forum'=>"home#forum"
post '/tag_position'=>"positions#tag_position"
post '/untag_position'=>"positions#untag_position"
get 'user_search'=>"home#user_search"
post 'change_relationship'=>'relationships#change_relationship'
get 'list_followed'=>'home#list_followed'
get 'list_followers'=>'home#list_followers'
post 'downvote_evaluation'=>"evaluations#downvote_evaluation"
post 'upvote_evaluation'=>"evaluations#upvote_evaluation"
post 'vote_quality_score'=>"annotations#vote_quality_score"


  # You can have the root of your site routed with "root"
  # root 'welcome#index'

root 'home#index'
get ':fen_param'=>"home#index"
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
