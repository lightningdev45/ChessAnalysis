class EvaluationsController < ApplicationController
skip_before_filter :verify_authenticity_token, only: [:create,:update]
	#include ActionController::Live

	def new
	end

	def evaluations_index
		@fen_param=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
		@evaluations=Evaluation.where("fen=? AND nodes IS NOT NULL",@fen_param).order("nodes DESC, created_at DESC").limit(10)
		respond_to do |format|
			format.js{}
		end
	end

	def index
		@fen_param=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
		if @position=Position.find_by(fen:@fen_param)
		else
			@position=Position.new
			@position.fen=@fen_param
			@position.save
		end
		@tags={}
		@tags[:tactics]=Tag.where('tag_sum>? AND tags.taggable_id=?',0,@position.id).joins(:taggings).where('taggings.taggable_type'=>"Position",'taggings.tag_category'=>"tactics",'taggings.taggable_id'=>@position.id).distinct.map{|tag|[tag.tag_value,tag.tag_sum]}
		@tags[:positional]=Tag.where('tag_sum>? AND tags.taggable_id=?',0,@position.id).joins(:taggings).where('taggings.taggable_type'=>"Position",'taggings.tag_category'=>"positional",'taggings.taggable_id'=>@position.id).distinct.map{|tag|[tag.tag_value,tag.tag_sum]}
		@tags[:opening]=Tag.where('tag_sum>? AND tags.taggable_id=?',0,@position.id).joins(:taggings).where('taggings.taggable_type'=>"Position",'taggings.tag_category'=>"opening",'taggings.taggable_id'=>@position.id).distinct.map{|tag|[tag.tag_value,tag.tag_sum]}
		@evaluations=Evaluation.where("fen=? AND nodes IS NOT NULL",@fen_param).order("nodes DESC, created_at DESC").limit(10).to_a.push(@position)
		respond_to do |format|
			format.json{render :json=>{
				evaluations:@evaluations,
				tags:@tags,
				fen_param:@fen_param}
			}
		end
	end

	def create
		@fen_param=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
		@evaluation=Evaluation.new
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
