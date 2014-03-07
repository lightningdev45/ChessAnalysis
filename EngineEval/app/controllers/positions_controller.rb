class PositionsController < ApplicationController
	respond_to :json

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

	def position_params
      params.require(:position).permit(:name,:comments,:fen,:moves,:nc_upload_id,:color)
    end
end
