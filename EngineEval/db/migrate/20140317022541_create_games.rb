class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
    t.text     "moves"
    t.string   "white"
    t.string   "black"
    t.string   "result"
    t.string   "date"
    t.string   "name"
    t.string   "eco"
    t.string   "blackelo"
    t.string   "whiteelo"
      t.timestamps
    end
  end
end
