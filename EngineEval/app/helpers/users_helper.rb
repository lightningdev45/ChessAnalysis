module UsersHelper
	def user_rating_select
		start=1000
		array=[]
		while start<3100
			array.push([start,start])
		start+=100
		end
		return array
	end

	def user_title_select
		array=[["None","None"],["FM","FM"],["WFM","WFM"],["IM","IM"],["WIM","WIM"],["GM","GM"],["WGM","WGM"]]
		return array
	end
end