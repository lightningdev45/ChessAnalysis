class RegistrationsController <  Devise::RegistrationsController
	respond_to :json
	def update
	  self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
	  prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

	  resource_updated = update_resource(resource, account_update_params)
	  yield resource if block_given?
	  if resource_updated
	    if is_flashing_format?
	      flash_key = update_needs_confirmation?(resource, prev_unconfirmed_email) ?
	        :update_needs_confirmation : :updated
	      set_flash_message :notice, flash_key
	    end
	    sign_in resource_name, resource, bypass: true
	    render json: {
	      "user"=>resource,
	        'csrf-param' => request_forgery_protection_token,
	        'csrf-token' => form_authenticity_token
      	}
	  else
	    clean_up_passwords resource
   		 respond_with resource
	  end
	end

	def create
	  build_resource(sign_up_params)
	  resource_saved = resource.save
	  yield resource if block_given?
	  if resource_saved
	    if resource.active_for_authentication?
	      set_flash_message :notice, :signed_up if is_flashing_format?
	      sign_up(resource_name, resource)
	      respond_with resource, location: after_sign_up_path_for(resource)
	    else
	      set_flash_message :notice, :signed_up_but_#{resource.inactive_message}" if is_flashing_format?
	      expire_data_after_sign_in!
	      render json: {
		      "user"=>resource,
		        'csrf-param' => request_forgery_protection_token,
		        'csrf-token' => form_authenticity_token
	      	}
	    end
	  else
	    clean_up_passwords resource
    	respond_with resource
	  end

	end

end
