class EvaluationsController < ApplicationController
skip_before_filter :verify_authenticity_token, only: [:create,:update]
	#include ActionController::Live

	def new
	end

	def evaluations_index
		if params[:fen]
			@fen_param=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
		else
			@fen_param="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
		end
		@evaluations=Evaluation.where("fen=? AND nodes IS NOT NULL",@fen_param).order("depth DESC, nodes DESC, created_at DESC").limit(64)
		respond_to do |format|
			format.json{render :json=>@evaluations}
		end
	end

	def show
		@evaluation=Evaluation.find(params[:id])
		render json:@evaluation
	end

	def index

	end

	def create
		@fen_param=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
		@evaluation=Evaluation.new
		if user_signed_in?
			@evaluation.user_id=current_user.id
		end
		@evaluation.fen=@fen_param
		@evaluation.position=@position
		@evaluation.save
	
		respond_to do |format|
			format.json{render :json=>{id:@evaluation.id}}
		end
	end

	def update
		require 'bigdecimal'
		@evaluation=Evaluation.find(params[:id])
		@evaluation.nodes=params[:nodes]
		@evaluation.seconds_run=params[:time].to_i/100
		@evaluation.seldepth=params[:seldepth]
		@evaluation.depth=params[:depth]
		@evaluation.engine=params[:engine]
		@evaluation.evaluation=BigDecimal.new(params[:evaluation])
		@evaluations=Evaluation.where(fen:@evaluation.fen).order(depth: :desc,nodes: :desc).limit(100)
		if !@evaluations.empty?
			if @evaluations.length<6
				@evaluation.save
				if @user=@evaluation.user
					if @evaluation.depth>@evaluations.first.depth&&(@evaluations.first.user_id!=@evaluation.user_id||@evaluations.length==1)
						@user.reputation+=5
					else
						@user.reputation+=1
					end
					@user.save
				end
				respond_to do |format|
					format.json{render :json=>{added:true,user:current_user}}
				end
			elsif @evaluation.depth>@evaluations[4].depth
				@evaluation.save
				if @user=@evaluation.user
					if @evaluation.depth>@evaluations.first.depth&&(@evaluations.first.user_id!=@evaluation.user_id||@evaluations.length==1)
						@user.reputation+=5
						deleted_id=@evaluations[4].id
						@evaluations[4].delete
					else
						@user.reputation+=1
						deleted_id=@evaluations[4].id
						@evaluations[4].delete
					end
					@user.save
				end
				respond_to do |format|
					format.json{render :json=>{added:true,deleted_id:deleted_id,user:current_user}}
				end
			else
				@evaluation.delete
				respond_to do |format|
					format.json{render :json=>{added:false}}
				end
			end
		else
			@evaluation.save
			respond_to do |format|
					format.json{render :json=>{added:true,empty:true}}
			end
		end
			
		
	end

	def upvote_evaluation
		if user_signed_in?
			@evaluation=Evaluation.find(params[:id])
			voted_for=current_user.voted_for? @evaluation,vote_scope:"legitimacy"
			@evaluation.vote voter:current_user, vote_scope:"legitimacy"
			if @evaluation.vote_registered
				if voted_for
					@evaluation.legit+=2
					@evaluation.save
					hello=true
				else
					@evaluation.legit+=1
					@evaluation.save
				end
			end
			render json:{legitimacy:@evaluation.legit}
		else
			render js:"alert('You must sign in to vote on an evaluation!')",status:403
		end
	end

	def downvote_evaluation
		if user_signed_in?
			@evaluation=Evaluation.find(params[:id])
			voted_for=current_user.voted_for? @evaluation,vote_scope:"legitimacy"
			@evaluation.downvote_from current_user, vote_scope:"legitimacy"
			if @evaluation.vote_registered
				if voted_for
					@evaluation.legit-=2
					if @evaluation.legit<=-5
						@evaluation.destroy
					else
						@evaluation.save
					end
				else
					@evaluation.legit-=1
					if @evaluation.legit<=-5
						@evaluation.destroy
					else
						@evaluation.save
					end
				end
			end
			render json:{legitimacy:@evaluation.legit}
		else
			render js:"alert('You must sign in to vote on an evaluation!')",status:403
		end
	end

	private

	 def evaluation_params
      params.require(:evaluation).permit(:name,:comments,:fen,:moves,:nc_upload_id,:color)
    end
end
