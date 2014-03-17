
class GamesController < ApplicationController

	def index
		@games=Game.find(:all,offset:0,limit:1000)
	end
	  
	def clean_database
		count=0
		Game.find_each do |game|
			if ["a3","a4","b3","b4","c3","c4","d3","d4","e3","e4","f3","f4","g3","g4","h3","h4","Nf3","Nc3","Nh3","Na3"].include?(game.moves.split(",")[0])
			else
				game.destroy
				count+=1
			end
		end
		respond_to do |format|
			format.html{redirect_to root_path,notice:"#{count} games deleted."}
		end
	end

	def fetch_games
		if params[:full]
		@fen=params[:fen]
		
		@fen=@fen.split(" ")[0..3].join(" ")+" 0 "+@fen.split(" ")[5]
		@position=Position.find_by(fen:@fen)
		@games_sent={}
		@games_found=GamePosition.connection.execute("SELECT \"game_positions\".* FROM \"game_positions\" WHERE \"game_positions\".\"position_id\" = #{@position.id} ORDER BY \"game_positions\".\"#{params[:sort]}\"").to_a
		
		@games_found[(params[:block].to_i*10+100*(params[:group].to_i-1))..(params[:block].to_i*10+9+100*(params[:group].to_i-1))].each_with_index do |game,index|
			@games_sent[index.to_s]={white_name:game["white_name"],black_name:game["black_name"],eco:game["eco"],date_played:game["date_played"],result:game["result"],game_id:game["game_id"],found_index:[(params[:block].to_i*10+100*(params[:group].to_i-1)+index)+1]}
		
		end
		@length=@games_found.length
		else
			@length=params[:length].to_i
		end
		
		@link_list=[]
		@more_groups=true
		@previous_groups=true
		if params[:group]
			if @length>params[:group].to_i*100
				(((params[:group].to_i-1)*10)+1).upto(params[:group].to_i*10) do |number|
					@link_list.push(number)
				end

			else
				if @length%10!=0
				(((params[:group].to_i-1)*10)+1).upto(@length/10+1) do |number|
					@link_list.push(number)
					end
				else
					(((params[:group].to_i-1)*10)+1).upto(@length/10) do |number|
					@link_list.push(number)
					end
				end
				@more_groups=false

			end
			if params[:group].to_i==1
				@previous_groups=false
			end
		end


		respond_to do |format|
				format.json{render :json=>{
				:games_sent => @games_sent,
				:list_length=>@length	
				}
			}
			format.js{}
		end
	end

	def improved_fen
		
			require 'json'
		@fen=params[:fen]||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
		@fen=@fen.split(" ")[0..3].join(" ")+" 0 "+@fen.split(" ")[5]
		@position=Position.find_by(fen:@fen)
		@next_moves=JSON.parse(@position.next_moves)
		#@games=GamePosition.connection.execute("SELECT \"game_positions\".* FROM \"game_positions\" WHERE \"game_positions\".\"position_id\" = #{@position.id} ORDER BY \"game_positions\".\"white_name\"").to_a
		
		@statistics={}
		@moves=[]
		@number_of_game=@next_moves.length
		@next_moves.each do |move,array|
			@moves.push(move)
			@statistics[move]={}
			@statistics[move][:times_played]=array[0]
			@statistics[move][:rating]=array[2]
			@statistics[move][:performance]=array[1]
			
			
			end
				@moves.each do |move|
				@statistics[move][:rating]=(@statistics[move][:rating]/@statistics[move][:times_played])
				@statistics[move][:performance]=(@statistics[move][:performance]*10/@statistics[move][:times_played])
			end
			@moves=JSON.dump(@moves.join(","))
			@statistics=JSON.dump(@statistics)		
			@hi={:hi=>"yes"}

			
			
		respond_to do |format|
			
			
			format.json{render :json=>{
				:statistics => @statistics,
				:moves => @moves,
				:hi => @hi

				}
			}
			format.html{}
		end

	end

=begin
	def new
		@a="/home/kempchee/Desktop/temp_file.txt"
		@inserts=[];
		@b=JSON.parse(`python /home/kempchee/Desktop/test.py #{@a}`)
		0.upto(@b[0].length-1) do |x|
			@inserts.push("('#{@b[0][x].join(",")}', '#{@b[1][x].sub(/[']/,"")}', '#{@b[2][x].sub(/[']/,"")}', '#{@b[3][x].sub(/[']/,"")}', '#{@b[4][x]}', '#{@b[5][x]}', '#{@b[6][x]}', '#{@b[7][x]}')")
		end	
		Game.connection.execute("INSERT INTO \"games\" (\"moves\", \"white\", \"black\", \"date\", \"result\", \"eco\", \"whiteelo\", \"blackelo\") VALUES #{@inserts.join(", ")}")
		respond_to do |format|
			format.html{redirect_to opening_files_path(id:current_user.id)}
		end

	end
=end
	def new
		
		
		start=0
		stop=100000
		last_lines=[]
			(1..23).each do |time|
				import_file=File.open("/home/kempchee/Desktop/grandmasterafter2000.pgn","r")
				output_file=File.open("/home/kempchee/Desktop/temp_file.txt","w+")
				previous=""
				import_file.each_line.with_index do |line,index|
					output_file.write(previous) if index>=start

					if (line.strip[0]=="["&&index>stop&&previous=="\r\n")||index==2286819
					
					start=index
					stop=start+100000
					last_lines.push(previous)
					break
					end
					previous=line if index>=start
				end
				output_file.close
				import_file.close
				parse_file="/home/kempchee/Desktop/temp_file.txt"
				@inserts=[];
				@b=JSON.parse(`python /home/kempchee/Desktop/test.py #{parse_file}`)
				0.upto(@b[0].length-1) do |x|
					@inserts.push("('#{@b[0][x].join(",")}', '#{@b[1][x].sub(/[']/,"")}', '#{@b[2][x].sub(/[']/,"")}', '#{@b[3][x].sub(/[']/,"")}', '#{@b[4][x]}', '#{@b[5][x]}', '#{@b[6][x]}', '#{@b[7][x]}')")
				end	
				Game.connection.execute("INSERT INTO \"games\" (\"moves\", \"white\", \"black\", \"date\", \"result\", \"eco\", \"whiteelo\", \"blackelo\") VALUES #{@inserts.join(", ")}")
			end

		respond_to do |format|
			format.html{redirect_to root_path,notice:last_lines}
		end

	end

	def show
		@game=Game.find(params[:id])
		@moves=@game.moves.split(",")
	end

	def download
		@game=Game.find(params[:id])
		@file_path="downloads/games/#{params[:id]}"
	 		@new_file=File.open(@file_path,"w+")
	 		@new_file.write("[Event]
	[Site]
	[Date]
	[Round]
	[White]
	[Black]
	[Result]
	[ECO]
	[WhiteElo]
	[BlackElo]
	[PlyCount]
	[EventDate]
	[EventType]
	[EventRounds]
	[EventCountry]
	[EventCategory]
	[Source]
	[SourceDate]\n\n")
			

			@game.moves.split(",").each_with_index do |move,index|
			@new_file.write("#{(index/2)+1}"+". "+move+" ") if index%2==0
			@new_file.write(move+" ") if index%2==1
			end
			
			send_file @new_file, :type=>"text", :x_sendfile=>true

			@new_file.close
	end


	def loop
		i=0
		while i<200_000_000
		i+=1
		end
	@ok={home:"yes"}
	@second={yes:"no"}
		respond_to do |format|
			format.json{render :json => {
		      :ok => @ok,
		      :second => @second
		   }}

		end
	end

end
