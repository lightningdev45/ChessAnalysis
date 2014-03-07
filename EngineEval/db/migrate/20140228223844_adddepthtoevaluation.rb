class Adddepthtoevaluation < ActiveRecord::Migration
  def change
  	add_column :evaluations,:depth,:integer
  end
end
