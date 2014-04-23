class Removeversionstatusfromannotation < ActiveRecord::Migration
  def change
  	remove_column :annotations,:version_status
  end
end
