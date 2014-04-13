class Addcachetotag < ActiveRecord::Migration
  def change
  	add_column :tags,:tag_count,:integer,default:0
  	add_column :tags,:tag_sum,:integer,default:0
  end
end
