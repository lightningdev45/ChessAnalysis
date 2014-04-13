class DPositionsController < ApplicationController
		require 'chess'
	def create
		DPosition.delete_all

	@dpositionhash={}
			


	Game.all[0..50000].each do |game,index|
			@moves=game.moves.split(",")
			@moves.pop
			@points=0
			@result=game.result
			if @result=="1-0"
				@points=10
			elsif @result=="1/2-1/2"
				@points=5
			end
			@fens=["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]
			chess=Chess::Game.new
			
			@moves.each_with_index do |move,index|
				break if index>=61
				begin
					chess.move(move)
					@fens.push(chess.current.to_fen)
					rescue Chess::IllegalMoveError => e
					end
				end	
			@fens.each_with_index do |fen,index|
				
		
				fen=fen.split(" ")[0..3].join(" ")+" 0 1"
				
				if @dpositionhash[fen]

					@dpositionhash[fen][:game_ids]<<",#{game.id}"


					if index<@fens.length-1

						if @dpositionhash[fen][:next_moves][@moves[index]]
							@dpositionhash[fen][:next_moves][@moves[index]][0]+=1
							@dpositionhash[fen][:next_moves][@moves[index]][1]+=@points
							@dpositionhash[fen][:next_moves][@moves[index]][2]+=game.blackelo.to_i if index%2==1
							@dpositionhash[fen][:next_moves][@moves[index]][2]+=game.whiteelo.to_i if index%2==0
							
							
						else
							if @fens[index+1].split(" ")[5]&&@fens[index+1].split(" ")[0..3]
							@dpositionhash[fen][:next_moves][@moves[index]]=[1,@points,game.blackelo.to_i,@fens[index+1].split(" ")[0..3].join(" ")+" 0 1"] if index%2==1
							@dpositionhash[fen][:next_moves][@moves[index]]=[1,@points,game.whiteelo.to_i,@fens[index+1].split(" ")[0..3].join(" ")+" 0 1"] if index%2==0
							else
							@dpositionhash[fen][:next_moves][@moves[index]]=[1,@points,game.blackelo.to_i,@fens[index+1]] if index%2==1
							@dpositionhash[fen][:next_moves][@moves[index]]=[1,@points,game.whiteelo.to_i,@fens[index+1]] if index%2==0
							end
							
						end
					else
					
					
					end
				else
					@dpositionhash[fen]={}
					@dpositionhash[fen][:game_ids]="#{game.id}"

					@dpositionhash[fen][:fen]=fen
					if index<@fens.length-1
						if @fens[index+1].split(" ")[5]&&@fens[index+1].split(" ")[0..3]
						@dpositionhash[fen][:next_moves]={@moves[index]=>[1,@points,game.blackelo.to_i,@fens[index+1].split(" ")[0..3].join(" ")+" 0 1"]} if index%2==1
						@dpositionhash[fen][:next_moves]={@moves[index]=>[1,@points,game.whiteelo.to_i,@fens[index+1].split(" ")[0..3].join(" ")+" 0 1"]} if index%2==0
						else
							@dpositionhash[fen][:next_moves]={@moves[index]=>[1,@points,game.blackelo.to_i,@fens[index+1]]} if index%2==1
							@dpositionhash[fen][:next_moves]={@moves[index]=>[1,@points,game.whiteelo.to_i,@fens[index+1]]} if index%2==0
						end
					else
						@dpositionhash[fen][:next_moves]={} 
						@dpositionhash[fen][:next_moves]={} 

					end
				end
					
			end

					

			
		end




		
		@inserts=[]
		@dpositionhash.each do |key,value|
			@inserts.push("('#{value[:game_ids]}','#{value[:fen]}','#{JSON.dump(value[:next_moves])}')")
		end
		DPosition.connection.execute("INSERT INTO \"d_positions\" (\"game_ids\", \"fen\",\"next_moves\") VALUES #{@inserts.join(", ")}")


		respond_to do |format|
			format.html{redirect_to games_path}
		end


	end
end
