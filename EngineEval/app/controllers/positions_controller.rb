class PositionsController < ApplicationController
	respond_to :json

	def tag_position
		@fen_param=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
		if(@position=Position.find_by(fen:@fen_param))
			if params[:tag_type]=="tactics"
				
				user_tags=@position.tactics_from(current_user)
				user_tags.push(params[:tag_value])
				@position.tactic_list.add(params[:tag_value])
				current_user.tag(@position,with:user_tags,on: :tactics)
			elsif params[:tag_type]=="positional"
				user_tags=@position.positional_motifs_from(current_user)
				user_tags.push(params[:tag_value])
				@position.positional_motif_list.add(params[:tag_value])
				current_user.tag(@position,with:user_tags,on: :positional_motifs)
			else
				user_tags=@position.openings_from(current_user)
				user_tags.push(params[:tag_value])
				@position.opening_list.add(params[:tag_value])
				current_user.tag(@position,with:user_tags,on: :openings)
			end
			respond_to do |format|
				format.js{}
			end
		else
			respond_to do |format|
				format.html{redirect_to root_path,notice:"There was an error.  Please try to tag the position again."}
			end
		end
	end

	def index

		
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
