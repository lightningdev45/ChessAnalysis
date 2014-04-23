class Removeversionfromannotation < ActiveRecord::Migration
  def change
  	remove_column :annotations,:version
  	add_column :annotations,:version_status,:string
  end
end
