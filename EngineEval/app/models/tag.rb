class Tag < ActiveRecord::Base
	has_many :taggings
	belongs_to :taggable,polymorphic:true
end
