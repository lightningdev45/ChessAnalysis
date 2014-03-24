class Annotation < ActiveRecord::Base
	has_many :annotation_edits
	belongs_to :position
	belongs_to :user
	has_many :annotation_quality_votes
	acts_as_votable
	
	
end
