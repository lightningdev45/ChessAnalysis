class Annotation < ActiveRecord::Base
	has_many :annotation_edits
	belongs_to :position
end
