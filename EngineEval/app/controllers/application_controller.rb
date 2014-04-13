class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
 protect_from_forgery with: :exception
 before_filter :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:email,:password,:password_confirmation,:profile_name) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:email,:password,:password_confirmation,:current_password,:first_name,:last_name,:icc,:playchess,:chess_com,:rating,:other,:location,:location_privacy,:email_privacy,:rating_privacy,:title_privacy,:icc_privacy,:chesscom_privacy,:playchess_privacy,:other_privacy,:first_name_privacy,:last_name_privacy,:avatar,:rating,:title,:language) }
  end
 
end
