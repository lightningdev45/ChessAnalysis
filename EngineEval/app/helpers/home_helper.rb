module HomeHelper
	def same_user?(user1,user2)
		if user1==user2
			"true"
		else

			"false"
		end
	end

	def show_user_trait(trait,user)
		if user[trait+"_privacy"]
			user[trait]
		else
			"Private"
		end
	end
end
