class Addqualityscoretoannotation < ActiveRecord::Migration
  def change
  	add_column :annotations,:quality_score,:decimal
  end
end
