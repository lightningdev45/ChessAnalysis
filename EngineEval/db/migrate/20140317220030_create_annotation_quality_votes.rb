class CreateAnnotationQualityVotes < ActiveRecord::Migration
  def change
    create_table :annotation_quality_votes do |t|
    t.integer :user_id
    t.integer :annotation_id
    t.integer :vote
      t.timestamps
    end
  end
end
