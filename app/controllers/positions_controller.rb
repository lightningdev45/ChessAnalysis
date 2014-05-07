class PositionsController < ApplicationController
	

	def tag_position
		@fen_param=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
		if(@position=Position.find_by(fen:@fen_param))
				if @tag=Tag.find_by(tag_value:params[:tag_value],taggable_id:@position.id)
					if @tagging=Tagging.find_by(user_id:current_user.id,tag_category:params[:tag_type],tag_value:params[:tag_value],taggable_id:@position.id)
						if(@tagging.tag_vote==0)
							@tagging.delete
							@tag.tag_sum+=1
							@tag.save
							@tags=Tag.where('tag_sum>? AND tags.taggable_id=?',0,@position.id).joins(:taggings).where('taggings.taggable_type'=>"Position",'taggings.tag_category'=>params[:tag_type],'taggings.taggable_id'=>@position.id).distinct.map{|tag|[tag.tag_value,tag.tag_sum]}
							respond_to do |format|
								format.text{render json:@tags.to_json}
							end
						else
							respond_to do |format|
								format.js{render :js=>"alert('You have already tagged this position with that value.')"}
							end
						end
					else	
						@tag.tag_sum+=1
						@tag.save
						@tagging=Tagging.new
						@tagging.user_id=current_user.id
						@tagging.taggable_id=@position.id
						@tagging.taggable_type="Position"
						@tagging.tag_category=params[:tag_type]
						@tagging.tag_value=params[:tag_value]
						@tagging.tag_id=@tag.id
						@tagging.tag_vote=1
						@tagging.save
						@tags=Tag.where('tag_sum>? AND tags.taggable_id=?',0,@position.id).joins(:taggings).where('taggings.taggable_type'=>"Position",'taggings.tag_category'=>params[:tag_type],'taggings.taggable_id'=>@position.id).distinct.map{|tag|[tag.tag_value,tag.tag_sum]}
						respond_to do |format|
							format.text{render json:@tags.to_json}
						end

					end
				else
					@tag=Tag.new
					@tag.tag_value=params[:tag_value]	
					@tag.tag_sum+=1
					@tag.taggable_type="Position"
					@tag.taggable_id=@position.id
					@tag.save
					@tagging=Tagging.new
					@tagging.user_id=current_user.id
					@tagging.taggable_id=@position.id
					@tagging.taggable_type="Position"
					@tagging.tag_category=params[:tag_type]
					@tagging.tag_value=params[:tag_value]
					@tagging.tag_id=@tag.id
					@tagging.tag_vote=1
					@tagging.save
					@tags=Tag.where('tag_sum>? AND tags.taggable_id=?',0,@position.id).joins(:taggings).where('taggings.taggable_type'=>"Position",'taggings.tag_category'=>params[:tag_type],'taggings.taggable_id'=>@position.id).distinct.map{|tag|[tag.tag_value,tag.tag_sum]}
					respond_to do |format|
						format.text{render json:@tags.to_json}
					end
				end
		else
			respond_to do |format|
				format.html{redirect_to root_path,notice:"There was an error.  Please try to tag the position again."}
			end
		end
	end

	def untag_position
		@fen_param=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
		if(@position=Position.find_by(fen:@fen_param))
				if @tag=Tag.find_by(tag_value:params[:tag_value],taggable_id:@position.id)
					if @tagging=Tagging.find_by(user_id:current_user.id,tag_category:params[:tag_type],tag_value:params[:tag_value],taggable_id:@position.id)
						if(@tagging.tag_vote==0)
							respond_to do |format|
								format.js{render :js=>"alert('You have already tagged this position with that value.')"}
							end
						else
							@tagging.delete
							@tag.tag_sum-=1
							@tag.save
							@tags=Tag.where('tag_sum>? AND tags.taggable_id=?',0,@position.id).joins(:taggings).where('taggings.taggable_type'=>"Position",'taggings.tag_category'=>params[:tag_type],'taggings.taggable_id'=>@position.id).distinct.map{|tag|[tag.tag_value,tag.tag_sum]}
							respond_to do |format|
								format.text{render json:@tags.to_json}
							end
						end

					else 	
						@tag.tag_sum-=1
						@tag.save
						@tagging=Tagging.new
						@tagging.user_id=current_user.id
						@tagging.taggable_id=@position.id
						@tagging.taggable_type="Position"
						@tagging.tag_category=params[:tag_type]
						@tagging.tag_value=params[:tag_value]
						@tagging.tag_id=@tag.id
						@tagging.tag_vote=0
						@tagging.save
						@tags=Tag.where('tag_sum>? AND tags.taggable_id=?',0,@position.id).joins(:taggings).where('taggings.taggable_type'=>"Position",'taggings.tag_category'=>params[:tag_type],'taggings.taggable_id'=>@position.id).distinct.map{|tag|[tag.tag_value,tag.tag_sum]}
						respond_to do |format|
							format.text{render json:@tags.to_json}
						end

					end
				else
					@tag=Tag.new
					@tag.tag_value=params[:tag_value]	
					@tag.tag_sum-=1
					@tag.taggable_type="Position"
					@tag.taggable_id=@position.id
					@tag.save
					@tagging=Tagging.new
					@tagging.user_id=current_user.id
					@tagging.taggable_id=@position.id
					@tagging.taggable_type="Position"
					@tagging.tag_category=params[:tag_type]
					@tagging.tag_value=params[:tag_value]
					@tagging.tag_id=@tag.id
					@tagging.tag_vote=0
					@tagging.save
					@tags=Tag.where('tag_sum>? AND tags.taggable_id=?',0,@position.id).joins(:taggings).where('taggings.taggable_type'=>"Position",'taggings.tag_category'=>params[:tag_type],'taggings.taggable_id'=>@position.id).distinct.map{|tag|[tag.tag_value,tag.tag_sum]}
					respond_to do |format|
						format.text{render json:@tags.to_json}
					end
				end
		else
			respond_to do |format|
				format.html{redirect_to root_path,notice:"There was an error.  Please try to untag the position again."}
			end
		end

	end

	def index
		if params[:fen]
			@fen_param=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
		else
			@fen_param="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
		end
		
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
		@evaluations=Evaluation.where("fen=? AND nodes IS NOT NULL",@fen_param).order("depth DESC,nodes DESC, created_at DESC").limit(64).to_a
		@signed_in=user_signed_in?
		respond_to do |format|
			format.json{render :json=>{
				evaluations:@evaluations,
				tags:@tags,
				fen_param:@fen_param,
				signed_in:@signed_in
				}
			}
		end
		
	end

	def new
	end

	def show
		

	end

	def create
	end

	def update_evaluation
		
	end

	private

	def position_params
      params.require(:position).permit(:name,:comments,:fen,:moves,:nc_upload_id,:color)
    end

end
