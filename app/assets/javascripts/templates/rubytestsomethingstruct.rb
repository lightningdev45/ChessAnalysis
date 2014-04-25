class Hello
	@a="something"
	def initialize
		puts Hello.a
	end
	def self.a
		 @a
	end
end
Hello.new