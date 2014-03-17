module AnnotationsHelper
	def version_status(id)
		version=Annotation.find(id)
		if version.date_superceded
			return "superceded"
		else
			return "current"
		end
	end
end
