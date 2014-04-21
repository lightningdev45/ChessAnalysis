class AnnotationQualityVotesController < ApplicationController
	def create
		if user_signed_in?
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
						render json:{quality:@annotation.quality}
					end
				else
					render :json=>{quality:Annotation.find(params[:annotation_id]).quality}
					
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
					render json:{quality:@annotation.quality}
				end
			end
		else
			render json:{error:"Your must sign in to vote on annotations!"},status:403
		end
	end
end
