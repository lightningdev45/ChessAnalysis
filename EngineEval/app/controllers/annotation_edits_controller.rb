class AnnotationEditsController < ApplicationController
	def show
		@annotation_edit=AnnotationEdit.find(params[:id])
		respond_to do |format|
			format.js{
			}
		end
	end

end
