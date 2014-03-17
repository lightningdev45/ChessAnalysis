class AnnotationsController < ApplicationController

	def create
		if @annotation=Annotation.find_by(fen:params[:fen])
			@annotation.fen=params[:fen]
			@annotation.moves=params[:moves]
			@annotation.parents=params[:parents]
			@annotation.children=params[:children]
			@annotation.dropcount=params[:dropcount]
			@annotation.numvariations=params[:numvariations]
			@annotation.comments=params[:comments]
			@annotation.mainvariations=params[:mainvariations]
			if @annotation.save
				respond_to do |format|
					format.js{}
				end
			end
		else
			@annotation=Annotation.new
			@annotation.fen=params[:fen]
			@annotation.moves=params[:moves]
			@annotation.parents=params[:parents]
			@annotation.children=params[:children]
			@annotation.dropcount=params[:dropcount]
			@annotation.numvariations=params[:numvariations]
			@annotation.comments=params[:comments]
			@annotation.mainvariations=params[:mainvariations]
			if @annotation.save
				respond_to do |format|
					format.js{}
				end
			end
		end
	end

	def get_annotation_data
		if @annotation=Annotation.find_by(fen:params[:fen])
			respond_to do |format|
				format.json{render :json=>{
						fen:@annotation.fen,
						moves:JSON.parse(@annotation.moves),
						comments:JSON.parse(@annotation.comments),
						dropcount:@annotation.dropcount,
						parents:JSON.parse(@annotation.parents),
						children:JSON.parse(@annotation.children),
						numvariations:@annotation.numvariations,
						mainvariations:JSON.parse(@annotation.mainvariations)
					}
				}
			end
		else
			respond_to do |format|
				format.json{render :json=>{
						fen:"false"
					}
				}
			end
		end
	end

end
