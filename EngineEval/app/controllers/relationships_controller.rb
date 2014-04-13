class RelationshipsController < ApplicationController
	
	def create
		if Relationship.exists?(follower_id:params[:follower],followed_id:params[:followed])
		else
			@relationship=Relationship.new
			@relationship.follower_id=params[:follower]
			@relationship.followed_id=params[:followed]
			@relationship.save
			respond_to do |format|
				format.js{}
			end
		end
	end

	def change_relationship
		if @relationship=Relationship.find_by(follower_id:params[:follower],followed_id:params[:followed])
			@relationship.destroy
			@button_content="Follow #{User.find(params[:followed]).profile_name}"
			@direction="remove"
		else
			@relationship=Relationship.new
			@relationship.follower_id=params[:follower]
			@relationship.followed_id=params[:followed]
			@relationship.save
			@button_content="Unfollow #{User.find(params[:followed]).profile_name}"
			@direction="add"
		end
		respond_to do |format|
			format.js{}
		end
	end
end
