class SessionsController < Devise::SessionsController
	respond_to :json
	def destroy
	    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
	    render json: {
	      'csrf-param' => request_forgery_protection_token,
	      'csrf-token' => form_authenticity_token
	    }
  	end

  	def current
  		if user_signed_in?
  				render json:{"user"=>current_user}
  		else
  			respond_with nil
  		end
  	end

  def create
    self.resource = warden.authenticate!(auth_options)
    
    sign_in(resource_name, resource)
    yield resource if block_given?
    render json: {
      "user"=>resource,
        'csrf-param' => request_forgery_protection_token,
        'csrf-token' => form_authenticity_token
      }
  end
  	
end
