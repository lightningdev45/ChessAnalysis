module ApplicationHelper
	

	def resource_name
    :user
  end
 
  def resource
    @resource ||= User.new
  end
 
  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
  def avatar_url(email,size)
    gravatar_id = Digest::MD5.hexdigest(email.downcase)
    return "http://gravatar.com/avatar/#{gravatar_id}.png?s=#{size}&d=mm"
  end
end
