class CreateUploads < ActiveRecord::Migration
  def change
    create_table :uploads do |t|
    	t.integer :user_id
    	t.string :file
    	t.string :type
      t.timestamps
    end
  end
end
