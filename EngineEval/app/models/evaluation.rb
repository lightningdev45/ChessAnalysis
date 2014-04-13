class Evaluation < ActiveRecord::Base
	belongs_to :position
	belongs_to :user
end
