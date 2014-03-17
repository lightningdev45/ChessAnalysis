class AnnotationQualityVotesController < ApplicationController
	def create
		@vote=AnnotationQualityVote.new
		@vote.vote=params[:vote].to_i
		@vote.user_id=current_user.user_id
		@vote.annotation_id=params[:annotation_id]
		if @vote.save
			respond_to do |format|
				format.js{}
			end
		end
	end
end
