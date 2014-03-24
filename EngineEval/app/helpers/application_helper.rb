module ApplicationHelper
	def avatar_url(user,size)
		gravatar_id = Digest::MD5.hexdigest(user.email.downcase)
		if size
	    	"http://gravatar.com/avatar/#{gravatar_id}.png?s=#{size}&d=mm"
	    else
	    	"http://gravatar.com/avatar/#{gravatar_id}.png?d=mm"
	    end
	end
end
