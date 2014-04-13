class HomeController < ApplicationController

	def how_to
	end

	def support
	end

	def forum
	end

	def about
	end
	
	def index
	end

	def user
		current_page = params[:events_id] || 1
  		per_page = params[:per_page] || 5
		@user=User.find(params[:id])
		if @user==current_user
			@follow_button=nil
		else
			if current_user.followed_users.include?(@user)
				@isFollowed=true
			else
				@isFollowed=false
			end
		end
		@followers_count=@user.followers.count
		@followed_count=@user.followed_users.count
		gravatar_id = Digest::MD5.hexdigest(@user.email.downcase)
		@gravatar_url="http://gravatar.com/avatar/#{gravatar_id}.png?s=100&d=mm"
		@iscurrentUser=(@user===current_user)
		@date=Date.today-30
		@events=(@user.evaluations.where("created_at>?",@date)|@user.annotations.where("created_at>?",@date)).sort_by{|event|event.created_at}.reverse
		@events_count=@events.count
		if @events_count%per_page==0
			@page_count=@events.count/per_page
		else
			@page_count=@events.count/per_page+1
		end
		if current_page.to_i%10==0
			@page_floor=current_page.to_i/10*10-9
			@page_ceiling=[current_page.to_i/10*10,@page_count].min
		else
			@page_floor=current_page.to_i/10*10+1
			@page_ceiling=[current_page.to_i/10*10+10,@page_count].min
		end
		@events=WillPaginate::Collection.create(current_page, per_page, @events.length) do |pager|
  			pager.replace @events[pager.offset, pager.per_page].to_a
		end
		render json:{user:@user,events:@events,isFollowed:@isFollowed,iscurrentUser:@iscurrentUser,gravatar_url:@gravatar_url,followed_count:@followed_count,followers_count:@followers_count,paginate:[@page_floor,@page_ceiling,current_page.to_i,@user.id,@page_count]}
	end

	def user_search
		current_page = params[:page] || 1
  		per_page = params[:per_page] || 10
  		@users=User.search(params[:search])
  		if @users
  			if user_signed_in?
	  			@followed_users=current_user.followed_users||[]
	  			@followers=current_user.followers||[]
	  		else
	  			@followed_users=[]
	  			@followers=[]
	  		end
	  		@users=WillPaginate::Collection.create(current_page, per_page, @users.length) do |pager|
	  			pager.replace @users[pager.offset, pager.per_page].to_a
			end
	  		@users.map! do |user|
	  			follower_count=user.followers.count
	  			hash_user=user.serializable_hash
	  			hash_user[:follower_count]=follower_count
	  			if user_signed_in?
	  				if @followed_users.include?(user)
	  					hash_user[:followed_user]=true
	  				else
	  					hash_user[:followed_user]=false
	  				end
	  				if @followers.include?(user)
	  					hash_user[:follower]=true
	  				else
	  					hash_user[:follower]=false
	  				end
	  			end
	  			gravatar_id = Digest::MD5.hexdigest(user["email"].downcase)
				gravatar_url="http://gravatar.com/avatar/#{gravatar_id}.png?s=100&d=mm"
				hash_user[:avatar]=gravatar_url
	  			 hash_user
	  		end
			
			respond_to do |format|
				format.json{render json:{users:@users}}
			end
		else
			respond_to do |format|
				format.json{render(json:{errors:"error"},status:422)}
			end
		end	
	end

	def list_followers
		@user=User.find(params[:id])
		@followers=@user.followers.paginate(page:params[:page], per_page:10)
	
		respond_to do |format|
			format.js{}
		end
	end

	def list_followed
		@user=User.find(params[:id])
		@followed=@user.followed_users.paginate(page:params[:page],per_page:10)

		respond_to do |format|
			format.js{}
		end
	end

end
