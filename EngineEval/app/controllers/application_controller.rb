class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
 protect_from_forgery with: :null_session
 before_filter :configure_permitted_parameters, if: :devise_controller?


 helper_method :current_user_json

  def current_user_json
    if current_user
      UserSerializer.new(current_user, :scope => current_user, :root => false).to_json
    else
      {}.to_json
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:email,:password,:password_confirmation,:current_password,:first_name,:last_name,:icc,:playchess,:chess_com,:rating,:other,:location,:location_privacy,:email_privacy,:rating_privacy,:title_privacy,:icc_privacy,:chesscom_privacy,:playchess_privacy,:other_privacy,:first_name_privacy,:last_name_privacy,:avatar,:rating,:title,:language,:name,:profile_name) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:email,:password,:password_confirmation,:current_password,:first_name,:last_name,:icc,:playchess,:chess_com,:rating,:other,:location,:location_privacy,:email_privacy,:rating_privacy,:title_privacy,:icc_privacy,:chesscom_privacy,:playchess_privacy,:other_privacy,:first_name_privacy,:last_name_privacy,:avatar,:rating,:title,:language,:name,:profile_name) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:email,:password,:password_confirmation,:current_password,:first_name,:last_name,:icc,:playchess,:chess_com,:rating,:other,:location,:location_privacy,:email_privacy,:rating_privacy,:title_privacy,:icc_privacy,:chesscom_privacy,:playchess_privacy,:other_privacy,:first_name_privacy,:last_name_privacy,:avatar,:rating,:title,:language,:name,:profile_name)}
  end
 
end
