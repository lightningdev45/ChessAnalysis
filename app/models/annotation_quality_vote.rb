class AnnotationQualityVote < ActiveRecord::Base
	belongs_to :user
	belongs_to :annotation
end
