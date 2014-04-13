process_group=Process.getpgrp
require 'json'

def make_slave(fen,cores,id)
	fork do

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
				`curl -H "Content-Type: application/json" -d '{"depth":"#{data[2]}",engine": "#{engine}","nodes":"#{data[9]}","seldepth":"#{data[4]}","evaluation": "#{data[7]}","time":"#{data[13]}"}' -X PUT http://localhost:3000/api/evaluations/"#{id}"`
				`curl -H "Content-Type: application/json" -d '{"depth":"#{data[2]}","engine": "#{engine}","nodes":"#{data[9]}","seldepth":"#{data[4]}","evaluation": "#{data[7]}","time":"#{data[13]}"}' -X PUT http://localhost:4000/api/evaluations/"#{id}"`
				else
					#puts "{'depth':#{data[2]},'evaluation':#{data[7]},'nodes':#{data[10]},'seldepth':#{data[4]},'time':#{data[14]}}"
				`curl -H "Content-Type: application/json" -d '{"depth":"#{data[2]}","engine": "#{engine}","seldepth":"#{data[4]}","nodes":"#{data[10]}","evaluation": "#{data[7]}","time":"#{data[14]}"}' -X PUT http://localhost:3000/api/evaluations/"#{id}"`
				`curl -H "Content-Type: application/json" -d '{"depth":"#{data[2]}","engine": "#{engine}","seldepth":"#{data[4]}","nodes":"#{data[10]}","evaluation": "#{data[7]}","time":"#{data[14]}"}' -X PUT http://localhost:4000/api/evaluations/"#{id}"`
				end			
			end
			update_count+=1
			
		end
	end
	end
end

connection_id=ARGV[0]

local_server=fork do
	`node desktop-client/desktop-client.js #{connection_id}`
end
sleep 1
fen=`curl -X GET http://localhost:4000`
puts fen
cores=ARGV[1]||1
id=JSON.parse(`curl -H "Content-Type: application/json" -d '{"fen": "#{fen}"}' -X POST http://localhost:3000/api/evaluations`)["id"]
slave=make_slave(fen,cores,id)

listener=fork do
	
	loop do 
		temp_fen=`curl -X GET http://localhost:4000`
		puts temp_fen
		if temp_fen=="kill"
			Process.kill('INT', -process_group)
		elsif temp_fen!=fen
			Process.kill("KILL",slave)
			fen=temp_fen
			id=JSON.parse(`curl -H "Content-Type: application/json" -d '{"fen": "#{fen}"}' -X POST http://localhost:3000/api/evaluations`)["id"]
			slave=make_slave(fen,cores,id)			
		end
		sleep 5
	end
end



if $stdin.gets
	#Process.kill("KILL",slave)
	#Process.kill("KILL",listener)
	#Process.kill("KILL",local_server)
	#Process.kill("HUP",js_process)
	trap("INT") do
  		exit
	end
	Process.kill('INT', -process_group)
end