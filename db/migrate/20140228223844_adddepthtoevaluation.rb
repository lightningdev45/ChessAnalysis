class Adddepthtoevaluation < ActiveRecord::Migration
  def change
  	add_column :evaluations,:depth,:integer,default:0
  end
end
