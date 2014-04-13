class GamePositionsController < ApplicationController
	def create
		start=0
		limit=250000
		otherlimit=4067
		@positionconnection=Position.connection
		@gameconnection=Game.connection
		@gameposconnection=GamePosition.connection
		@count=0
		8.times do |time|
			inserts=[];
			if time!=7
			positions=@positionconnection.execute("SELECT \"positions\".* FROM \"positions\" WHERE (\"positions\".\"id\" > #{start}) ORDER BY \"positions\".\"id\" ASC LIMIT #{limit}")
			else
			positions=@positionconnection.execute("SELECT \"positions\".* FROM \"positions\" WHERE (\"positions\".\"id\" > #{start}) ORDER BY \"positions\".\"id\" ASC LIMIT #{otherlimit}")
			end
			positions.each do |position|
				@count+=1
				
				position["game_ids"].split(",").each do |id|
					 game=@gameconnection.execute("SELECT \"games\".* FROM \"games\" WHERE \"games\".\"id\" = #{id} LIMIT 1")
					 inserts.push("('#{game[0]["id"]}', '#{position["id"]}')")
				end
			
			end
			
			@gameposconnection.execute("INSERT INTO \"game_positions\" (\"game_id\", \"position_id\") VALUES #{inserts.join(", ")}")
			start+=250000
		end
		respond_to do |format|
			format.html{redirect_to improved_fen_path,notice:@count}
		end
	end
end
