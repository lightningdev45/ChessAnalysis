module AnnotationsHelper
	def version_status(id)
		version=Annotation.find(id)
		if version.date_superceded
			return "superceded"
		else
			return "current"
		end
	end

	def formatted_date_superceded(id)
		version=Annotation.find(id)
		if version.date_superceded
			return version.date_superceded.strftime("%m/%d/%y")
		else
			return "NA"
		end
	end
end	
