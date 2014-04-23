class Deletesupercededfromannotation < ActiveRecord::Migration
  def change
  	remove_column :annotations,:date_superceded
  end
end
