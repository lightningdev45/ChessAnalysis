class Position < ActiveRecord::Base
	has_many :evaluations,dependent: :destroy
	acts_as_taggable_on :openings,:tactics,:positional_motifs
end
