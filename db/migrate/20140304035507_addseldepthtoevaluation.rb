class Addseldepthtoevaluation < ActiveRecord::Migration
  def change
  	add_column :evaluations,:seldepth,:integer
  end
end
