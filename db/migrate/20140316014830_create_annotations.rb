class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
    t.string :fen
    t.text :comments
    t.text :moves
    t.text :parents
    t.text :children
    t.integer :numvariations
    t.integer :dropcount
    t.text :mainvariations
    t.integer :position_id
      t.timestamps
    end
  end
end
