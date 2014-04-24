class Hello
	def initialize(hat)
		@hat=hat
	end

	def something
		puts @hat
	end
end

hello=Hello.new("hat")
hello.something