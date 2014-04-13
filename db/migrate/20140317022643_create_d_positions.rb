class CreateDPositions < ActiveRecord::Migration
  def change
    create_table :d_positions do |t|
    t.text     "game_ids"
    t.text     "next_moves"
    t.text     "dates"
    t.text     "fen"
      t.timestamps
    end
  end
end
