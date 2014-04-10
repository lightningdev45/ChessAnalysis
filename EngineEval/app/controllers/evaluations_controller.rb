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
		@evaluations=Evaluation.where("fen=? AND nodes IS NOT NULL",@fen_param).order("nodes DESC, created_at DESC").limit(10)
		respond_to do |format|
			format.json{render :json=>@evaluations}
		end
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
		@evaluation.save
		respond_to do |format|
			format.json{render :json=>{}}
		end
	end

	 def evaluation_params
      params.require(:evaluation).permit(:name,:comments,:fen,:moves,:nc_upload_id,:color)
    end
end
