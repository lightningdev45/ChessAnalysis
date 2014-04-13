class Position < ActiveRecord::Base
	has_many :evaluations,dependent: :destroy
end
