class Moretagchagnes < ActiveRecord::Migration
  def change
  	remove_column :tags,:position_id
  	add_column :tags,:taggable_id,:integer
  	add_column :tags,:taggable_type,:string
  end
end
