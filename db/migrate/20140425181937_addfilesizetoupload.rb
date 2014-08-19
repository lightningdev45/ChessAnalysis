class Addfilesizetoupload < ActiveRecord::Migration
  def change
  	add_column :uploads,:file_size,:integer,default:0
  end
end
