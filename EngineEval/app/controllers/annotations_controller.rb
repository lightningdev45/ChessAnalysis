class AnnotationsController < ApplicationController

	def create
			@fen=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
			@annotation=Annotation.new
			@annotation.fen=@fen
			@annotation.moves=params[:moves]
			@annotation.parents=params[:parents]
			@annotation.children=params[:children]
			@annotation.dropcount=params[:dropcount]
			@annotation.numvariations=params[:numvariations]
			@annotation.comments=params[:comments]
			@annotation.mainvariations=params[:mainvariations]
			@annotation.version=0

			if @annotation.save
				if Annotation.where(fen:@fen).count>1
					@superceded=Annotation.find_by(fen:@fen,version:1)
					@superceded.date_superceded=DateTime.now
					@superceded.save
				end
				Annotation.where(fen:@fen).each do |annotation|
					annotation.version+=1;
					annotation.save
				end
				respond_to do |format|
					format.js{}
				end
			end
	end

	def get_annotation_data
		@fen_param=params[:fen].split(" ")[0..3].join(" ")+" 0 1"
		if @annotation=Annotation.find_by(fen:@fen_param,version:params[:version])
			@annotation_versions=Annotation.where(fen:@fen_param).order(:created_at).reverse[0..24]
			@fen=@annotation.fen
			@moves=@annotation.moves
			@comments=@annotation.comments
			@dropcount=@annotation.dropcount
			@parents=@annotation.parents
			@children=@annotation.children
			@numvariations=@annotation.numvariations
			@mainvariations=@annotation.mainvariations

			respond_to do |format|
				format.js{}
			end
		else
			@fen="false"
			@annotation_versions=[]
			@moves=""
			@comments=""
			@dropcount=""
			@parents=""
			@children=""
			@numvariations=""
			@mainvariations=""
			respond_to do |format|
				format.js{}
			end
		end
	end

end
