class CreatePositions < ActiveRecord::Migration
  def change
    create_table :positions do |t|
    	t.string :fen
      t.timestamps
    end
  end
end
