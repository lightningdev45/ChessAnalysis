class Annotation < ActiveRecord::Base
	has_many :annotation_edits
	belongs_to :position
	has_many :annotation_quality_votes
end
