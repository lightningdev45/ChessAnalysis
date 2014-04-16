class Evaluation < ActiveRecord::Base
	belongs_to :position
	belongs_to :user
	acts_as_votable
end
