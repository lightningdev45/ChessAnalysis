class Annotation < ActiveRecord::Base
	has_many :annotation_edits
	belongs_to :position
	belongs_to :user
	has_many :annotation_quality_votes
	acts_as_votable
	
	def self.annotation_versions(fen)
		annotation_versions=Annotation.where(fen:fen).order(:created_at).reverse[0..63].to_a.map do |annotation|
					votes_count=annotation.votes.size
					annotation=annotation.serializable_hash
					annotation["created_at"]=annotation["created_at"].strftime("%m/%d/%y")
					annotation["profile_name"]=User.find(annotation["user_id"]).profile_name
					annotation["superceded"]=true
					annotation["isEditing"]=false
					annotation["vote_count"]=votes_count
					annotation["visible"]=false
					annotation
				end
		annotation_versions[0]["superceded"]=false
		annotation_versions[0]["visible"]=true
		return annotation_versions
	end
	
end
