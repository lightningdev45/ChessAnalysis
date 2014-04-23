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
			@annotation.user_id=@user.id
			if Annotation.where(fen:@fen).count>0
					@user.reputation+=1
				else
					@user.reputation+=2
			end
			if @annotation.save
				@user.save
				@annotation_versions=Annotation.where(fen:@fen).order(:created_at).reverse[0..63].to_a.map do |annotation|
					votes_count=annotation.votes.size
					annotation=annotation.serializable_hash
					annotation["created_at"]=annotation["created_at"].strftime("%m/%d/%y")
					annotation["profile_name"]=User.find(annotation["user_id"]).profile_name
					annotation["superceded"]=true
					annotation["isEditing"]=false
					annotation["vote_count"]=votes_count
					if annotation["id"]==@annotation.id
						annotation["visible"]=true
					else
						annotation["visible"]=false
					end
					annotation
				end
				@annotation_versions[0]["superceded"]=false
				@annotation_versions[0]["visible"]=true
				render json:{current_head:@annotation_versions[0]["id"],user:@user,annotation_versions:@annotation_versions}
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
		if @annotation=Annotation.exists?(fen:@fen_param)
			@annotation_versions=Annotation.where(fen:@fen_param).order(:created_at).reverse[0..63].to_a.map do |annotation|
				votes_count=annotation.votes.size
				annotation=annotation.serializable_hash
				annotation["superceded"]=true
				annotation["created_at"]=annotation["created_at"].strftime("%m/%d/%y")
				annotation["profile_name"]=User.find(annotation["user_id"]).profile_name
				annotation["isEditing"]=false
				annotation["votes_count"]=votes_count
				annotation["visible"]=false
				annotation
			end
			@annotation_versions[0]["superceded"]=false
			@annotation_versions[0]["visible"]=true
			@moves=JSON.parse(@annotation_versions[0]["moves"])
			@comments=JSON.parse(@annotation_versions[0]["comments"])
			@dropcount=@annotation_versions[0]["dropcount"]
			@parents=JSON.parse(@annotation_versions[0]["parents"])
			@children=JSON.parse(@annotation_versions[0]["children"])
			@numvariations=@annotation_versions[0]["numvariations"]
			@mainvariations=JSON.parse(@annotation_versions[0]["mainvariations"])

			render json:{current_head:@annotation_versions[0]["id"],fen:@fen_param,annotation_versions:@annotation_versions,moves:@moves,comments:@comments,dropcount:@dropcount,parents:@parents,children:@children,numvariations:@numvariations,mainvariations:@mainvariations}
		else
			@fen_param="false"
			@annotation_versions=[]
			@moves=nil
			@comments=""
			@dropcount=""
			@parents=""
			@children=""
			@numvariations=""
			@mainvariations=""
			render json:{current_head:nil,fen:@fen_param,annotation_versions:@annotation_versions,moves:@moves,comments:@comments,dropcount:@dropcount,parents:@parents,children:@children,numvariations:@numvariations,mainvariations:@mainvariations}
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
			@quality_score=(BigDecimal.new(@annotation.likes.sum(:vote_weight))/BigDecimal.new(@votes_count)).round(3)
			@annotation.quality_score=@quality_score
			@annotation.save
			render json:{quality_score:@quality_score,votes_count:@votes_count}
		else
			render json:{error:"You must sign in to vote on an annotation!"},status:503
		end
	end

end
