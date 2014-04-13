class Makeprofilenameunique < ActiveRecord::Migration
  def change
  	remove_column :users,:profile_name
  	add_column :users,:profile_name,:string,unique:true
  end
end
