class Addusertoevaluation < ActiveRecord::Migration
  def change
  	add_column :evaluations,:user_id,:integer
  end
end
