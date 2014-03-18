class AnnotationQualityVotesController < ApplicationController
		before_filter :authenticate_user!
	def create
		if @vote=current_user.annotation_quality_votes.find_by(annotation_id:params[:annotation_id])
			if params[:vote].to_i!=@vote.vote
				@vote.vote=params[:vote].to_i
				@vote.user_id=current_user.id
				@vote.annotation_id=params[:annotation_id]
				@annotation=Annotation.find(params[:annotation_id])
				if params[:vote].to_i==1
					@annotation.quality+=2
				else
					@annotation.quality-=2
				end
				@annotation.save
				if @vote.save
					respond_to do |format|
						format.js{}
					end
				end
			else
				respond_to do |format|
					format.json{render :json=>{}}
				end
			end
		else
			@vote=AnnotationQualityVote.new
			@vote.vote=params[:vote].to_i
			@vote.user_id=current_user.id
			@vote.annotation_id=params[:annotation_id]
			@annotation=Annotation.find(params[:annotation_id])
			if params[:vote].to_i==1
				@annotation.quality+=1
			else
				@annotation.quality-=1
			end
			@annotation.save
			if @vote.save
				respond_to do |format|
					format.js{}
				end
			end
		end
	end
end
