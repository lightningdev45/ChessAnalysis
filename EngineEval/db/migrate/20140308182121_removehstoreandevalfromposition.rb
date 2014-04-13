class Removehstoreandevalfromposition < ActiveRecord::Migration
  def change
  	remove_column :positions,:hstore
  	remove_column :positions,:evaluation
  end
end
