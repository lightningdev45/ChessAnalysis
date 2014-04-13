class Addtoannotation < ActiveRecord::Migration
  def change
  	add_column :annotations,:version,:integer
  	add_column :annotations,:date_superceded,:datetime
  end
end
