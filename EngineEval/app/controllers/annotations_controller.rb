class AnnotationsController < ApplicationController

	def create
			@annotation=Annotation.new
			@annotation.fen=params[:fen]
			@annotation.moves=params[:moves]
			@annotation.parents=params[:parents]
			@annotation.children=params[:children]
			@annotation.dropcount=params[:dropcount]
			@annotation.numvariations=params[:numvariations]
			@annotation.comments=params[:comments]
			@annotation.mainvariations=params[:mainvariations]
			@annotation.version=0

			if @annotation.save
				@superceded=Annotation.find_by(fen:params[:fen],version:1)
				@superceded.date_superceded=DateTime.now
				@superceded.save
				Annotation.where(fen:params[:fen]).each do |annotation|
					annotation.version+=1;
					annotation.save
				end
				respond_to do |format|
					format.js{}
				end
			end
	end

	def get_annotation_data
		if @annotation=Annotation.find_by(fen:params[:fen],version:params[:version])
			@annotation_versions=Annotation.where(fen:params[:fen]).order(:created_at).reverse[0..24]
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
