class Deletehstorecolumn < ActiveRecord::Migration
  def change
  	remove_column :positions,:hstore
  end
end
