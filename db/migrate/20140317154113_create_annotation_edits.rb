class CreateAnnotationEdits < ActiveRecord::Migration
  def change
    create_table :annotation_edits do |t|
    	t.string :fen
    	t.integer :user_id
    	t.text :additions
    	t.text :deletions
    	t.integer :quality
    	t.integer :position_id
    	t.integer :annotation_id
      t.timestamps
    end
  end
end
