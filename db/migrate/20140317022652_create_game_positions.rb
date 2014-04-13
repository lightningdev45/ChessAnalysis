class CreateGamePositions < ActiveRecord::Migration
  def change
    create_table :game_positions do |t|
	    t.integer  "game_id"
	    t.integer  "position_id"
	    t.string   "white_name"
	    t.string   "black_name"
	    t.string   "date_played"
	    t.string   "result"
	    t.string   "eco"
	    t.string   "whiteelo"
    	t.string   "blackelo"
      t.timestamps
    end
  end
end
