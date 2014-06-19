class InterestEmailsController < ApplicationController
	def create
		@interest_email=InterestEmail.new
		@interest_email.email=params[:email]
		if @interest_email.save
			render json:{message:"Email successfully added to database."}
		else
			render json:{error:"There was an error.  Please resubmit your email."},status:500
		end
	end

end
