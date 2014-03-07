class Changeevlautiontohstore < ActiveRecord::Migration
  def change
  	remove_column :positions,:evaluation
  	add_column :positions,:evaluation,:hstore
  end
end
