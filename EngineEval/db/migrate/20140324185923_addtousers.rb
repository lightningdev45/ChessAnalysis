class Addtousers < ActiveRecord::Migration
  def change
  	add_column :users,:location_privacy,:boolean,default:false
  	add_column :users,:email_privacy,:boolean,default:false
  	add_column :users,:rating_privacy,:boolean,default:false
  	add_column :users,:title_privacy,:boolean,default:false
  	add_column :users,:icc_privacy,:boolean,default:false
  	add_column :users,:chesscom_privacy,:boolean,default:false
  	add_column :users,:playchess_privacy,:boolean,default:false
  	add_column :users,:other_privacy,:boolean,default:false
  	add_column :users,:first_name_privacy,:boolean,default:false
  	add_column :users,:last_name_privacy,:boolean,default:false
  	add_column :users,:last_name,:string
  	add_column :users,:first_name,:string
  	add_column :users,:location,:string
  	add_column :users,:icc,:string
  	add_column :users,:chess_com,:string
  	add_column :users,:playchess,:string

  end
end
