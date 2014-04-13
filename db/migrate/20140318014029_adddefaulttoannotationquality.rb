class Adddefaulttoannotationquality < ActiveRecord::Migration
  def change
  	remove_column :annotations,:quality
  	add_column :annotations,:quality,:integer,default: 0
  end
end
