class Addpositionidtotag < ActiveRecord::Migration
  def change
  	add_column :tags,:position_id,:integer
  end
end
