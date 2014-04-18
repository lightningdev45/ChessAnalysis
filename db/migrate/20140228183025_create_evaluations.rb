class CreateEvaluations < ActiveRecord::Migration
  def change
    create_table :evaluations do |t|
    	t.string :engine
    	t.integer :seconds_run,default:0
    	t.decimal :evaluation
    	t.string :fen
    	t.integer :position_id
    	t.integer :nodes,default:0
      t.timestamps
    end
  end
end
