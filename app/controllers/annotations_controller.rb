class AnnotationsController < ApplicationController

	def create
		if user_signed_in?
			@user=current_user
			@fen=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
			@annotation=Annotation.new
			@position=Position.find_by(fen:@fen)
			@annotation.fen=@fen
			@annotation.position_id=@position.id
			@annotation.moves=params[:moves]
			@annotation.parents=params[:parents]
			@annotation.children=params[:children]
			@annotation.dropcount=params[:dropcount]
			@annotation.numvariations=params[:numvariations]
			@annotation.comments=params[:comments]
			@annotation.mainvariations=params[:mainvariations]
			@annotation.version=0
			@annotation.user_id=@user.id
			if @annotation.save
				if Annotation.where(fen:@fen).count>1
					@superceded=Annotation.find_by(fen:@fen,version:1)
					@superceded.date_superceded=DateTime.now
					@superceded.save
					@user.reputation+=1
				else
					@user.reputation+=2
				end
				@user.save
				Annotation.where(fen:@fen).each do |annotation|
					annotation.version+=1;
					annotation.save
				end
				@annotation_versions=Annotation.where(fen:@fen).order(:created_at).reverse[0..63].to_a.map do |annotation|
					votes_count=annotation.votes.size
					annotation=annotation.serializable_hash
					if annotation["date_superceded"]
						annotation["date_superceded"]=annotation["date_superceded"].strftime("%m/%d/%y")
					end
					annotation["created_at"]=annotation["created_at"].strftime("%m/%d/%y")
					annotation["profile_name"]=User.find(annotation["user_id"]).profile_name
					annotation["isEditing"]=false
					annotation["vote_count"]=votes_count
					if annotation["id"]==@annotation.id
						annotation["visible"]=true
					else
						annotation["visible"]=false
					end
					annotation
				end
				render json:{user:@user,annotation_versions:@annotation_versions}
			else
				render json:{error:"There was an error, please try again."},status:503
			end
		else
			render json:{error:"You must sign in to add an or edit an annotation"},status:403
		end
	end

	def get_annotation_data
		require 'date'
		@fen_param=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
		if @annotation=Annotation.find_by(fen:@fen_param,version:params[:version])
			@annotation_versions=Annotation.where(fen:@fen_param).order(:created_at).reverse[0..63].to_a.map do |annotation|
				votes_count=annotation.votes.size
				annotation=annotation.serializable_hash
				if annotation["date_superceded"]
					annotation["date_superceded"]=annotation["date_superceded"].strftime("%m/%d/%y")
				end
				annotation["created_at"]=annotation["created_at"].strftime("%m/%d/%y")
				annotation["profile_name"]=User.find(annotation["user_id"]).profile_name
				annotation["isEditing"]=false
				annotation["votes_count"]=votes_count
				if annotation["id"]==@annotation.id
					annotation["visible"]=true
				else
					annotation["visible"]=false
				end
				annotation
			end
			@fen=@annotation.fen
			@moves=JSON.parse(@annotation.moves)
			@comments=JSON.parse(@annotation.comments)
			@dropcount=@annotation.dropcount
			@parents=JSON.parse(@annotation.parents)
			@children=JSON.parse(@annotation.children)
			@numvariations=@annotation.numvariations
			@mainvariations=JSON.parse(@annotation.mainvariations)

			render json:{fen:@fen,annotation_versions:@annotation_versions,moves:@moves,comments:@comments,dropcount:@dropcount,parents:@parents,children:@children,numvariations:@numvariations,mainvariations:@mainvariations}
		else
			@fen="false"
			@annotation_versions=[]
			@moves=nil
			@comments=""
			@dropcount=""
			@parents=""
			@children=""
			@numvariations=""
			@mainvariations=""
			render json:{fen:@fen,annotation_versions:@annotation_versions,moves:@moves,comments:@comments,dropcount:@dropcount,parents:@parents,children:@children,numvariations:@numvariations,mainvariations:@mainvariations}
		end
	end

	def vote_quality_score
		require 'bigdecimal'
		if user_signed_in?
			@user=current_user
			@annotation=Annotation.find(params[:id])
			if @user.voted_for? @annotation
				@annotation.unliked_by @user
				@annotation.liked_by @user,vote_weight:params[:vote].to_i
			else
				@annotation.liked_by @user,vote_weight:params[:vote].to_i
			end
			@votes_count=@annotation.votes.size
			@quality_score=BigDecimal.new(@annotation.likes.sum(:vote_weight))/BigDecimal.new(@votes_count)
			@annotation.quality_score=@quality_score
			@annotation.save
			render json:{quality_score:@quality_score,votes_count:@votes_count}
		else
			render json:{error:"You must sign in to vote on an annotation!"},status:503
		end
	end

end
