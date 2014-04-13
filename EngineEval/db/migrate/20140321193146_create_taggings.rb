class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
    t.integer :user_id
    t.integer :taggable_id
    t.string :taggable_type
    t.string :tag_category
    t.string :tag_value
    t.integer :tag_vote
    t.string :tag_custom_vote
      t.timestamps
    end
  end
end
