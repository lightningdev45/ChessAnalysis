class EvaluationsController < ApplicationController
skip_before_filter :verify_authenticity_token, only: [:create,:update]
	#include ActionController::Live

	def new
	end

	def index
		@evaluations=Evaluation.where("fen=? AND nodes IS NOT NULL",params[:fen]).order("nodes DESC, created_at DESC").limit(10)
		respond_to do |format|
			format.json{render :json=>@evaluations}
		end
	end

	def create
		
		
		if @position=Position.find_by(fen:params[:fen])
			@evaluation=Evaluation.new
			@evaluation.fen=params[:fen]
			@evaluation.position=@position
			@evaluation.save
		else
			@position=Position.new
			@position.fen=params[:fen]
			if @position.save
				@evaluation=Evaluation.new
				@evaluation.fen=params[:fen]
				@evaluation.position=@position
				@evaluation.save
			end
		end

		
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
