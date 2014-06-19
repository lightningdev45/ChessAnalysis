class Position < ActiveRecord::Base
	has_many :evaluations,dependent: :destroy
	has_many :annotations,dependent: :destroy

	def required_reputation
		annotation_count=self.annotations.count
		if annotation_count>10
			last_annotation=self.annotations.order(:created_at).last
			votes_count=last_annotation.get_likes.size			
			if votes_count>=10
				quality_score=(BigDecimal.new(last_annotation.get_likes.sum(:vote_weight))/BigDecimal.new(votes_count)).round(3)
				return (((quality_score/5)**3)*100*annotation_count).to_i
			else	
				return annotation_count*100
			end
		else
			return annotation_count*100
		end
	end
end
