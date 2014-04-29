class PasswordsController<Devise::PasswordsController

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
      set_flash_message(:notice, flash_message) if is_flashing_format?
      sign_in(resource_name, resource)
      render json:{user:resource}, status:200
    else
      render json:{error:"An error occurred. Please request a new link to reset your password and/or contact support."}
    end
  end

end