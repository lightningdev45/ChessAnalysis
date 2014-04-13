class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
    	t.string :tag_value

      t.timestamps
    end
  end
end
