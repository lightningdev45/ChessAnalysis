class UploadsController < ApplicationController
			#before_filter :authenticate_user!
	def new
		@upload=Upload.new
		respond_to do |format|
			format.html{}
		end
		
	end

	def index
		@uploads=Upload.all
		render json:{uploads:@uploads}
	end

	def create
		uploaded_io=params[:file]
		@upload=Upload.new
		@upload.file=uploaded_io.original_filename
		@upload.file_size=uploaded_io.size
		if @upload.save
			File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
	    		file.write(uploaded_io.read)
	  		end
				render json:{new_upload:@upload}
		else
			render json:{error:"There was an error uploading the file.  Please try again."}
		end

	end

	def destroy
		@upload=Upload.find(params[:id])
		if @upload.destroy
			current_user.upload_size-=@upload.file_size
			current_user.save
			respond_to do |format|
				format.js{}
			end
		end
	end

	private 
		def upload_params
      params.require(:upload).permit(:user_id,:file)
  end
end
