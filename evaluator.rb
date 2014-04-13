require 'json'
fen=ARGV[0]||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
cores=ARGV[1]||1
id=JSON.parse(`curl -H "Content-Type: application/json" -d '{"fen": "#{fen}"}' -X POST http://0.0.0.0:3000/api/evaluations`)["id"]
slave=fork do

require 'pty'
	master, slave = PTY.open
	read, write = IO.pipe

	pid = spawn("stockfish", :in=>read, :out=>slave)
	calculating=0
	     # we dont need the read
	slave.close
	read.close
	write.puts('uci')
	master.gets
	engine=master.gets.split(" ")[2..-1].join(" ")
	write.puts("setoption name Threads value #{cores}")

	write.puts("position fen #{fen}")

	write.puts('go infinite')
	update_count=0
	loop do

		line=master.gets

		data=line.split(" ")
		if data[3]=="seldepth"
			if update_count%5==0
				if data[9]=~/[0-9]+/
				 #puts "{'engine': #{engine},'depth':#{data[2]},'evaluation':#{data[7]},'nodes':#{data[9]},'seldepth':#{data[4]},'time':#{data[13]}}"
				`curl -H "Content-Type: application/json" -d '{"engine": "#{engine}","nodes":"#{data[9]}","seldepth":"#{data[4]}","evaluation": "#{data[7]}","time":"#{data[13]}"}' -X PUT http://0.0.0.0:3000/api/evaluations/"#{id}"`
				else
					#puts "{'depth':#{data[2]},'evaluation':#{data[7]},'nodes':#{data[10]},'seldepth':#{data[4]},'time':#{data[14]}}"
				`curl -H "Content-Type: application/json" -d '{"engine": "#{engine}","seldepth":"#{data[4]}","nodes":"#{data[10]}","evaluation": "#{data[7]}","time":"#{data[14]}"}' -X PUT http://0.0.0.0:3000/api/evaluations/"#{id}"`
				end			
			end
			update_count+=1
			
		end
	end
end

if $stdin.gets
	Process.kill("KILL",slave)
end


