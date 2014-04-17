class Addlegittoevaluation < ActiveRecord::Migration
  def change
  	add_column :evaluations,:legit,:integer,:default=>0
  	remove_column :users,:reputation
  	add_column :users,:reputation,:integer,default:0
  end
end
