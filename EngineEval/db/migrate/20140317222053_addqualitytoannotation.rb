class Addqualitytoannotation < ActiveRecord::Migration
  def change
  	add_column :annotations,:quality,:integer
  end
end
