class Position < ActiveRecord::Base
	has_many :evaluations,dependent: :destroy
	has_many :annotations,dependent: :destroy
end
