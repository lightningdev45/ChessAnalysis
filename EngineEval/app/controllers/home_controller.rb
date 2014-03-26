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
		current_page = params[:page] || 1
  		per_page = params[:per_page] || 10
		@user=User.find(params[:id])
		if @user==current_user
		else
			if current_user.followed_users.include?(@user)
				@follow_button="Unfollow #{@user.profile_name}"
			else
				@follow_button="Follow #{@user.profile_name}"
			end
		end

		@date=Date.today-30
		@events=(@user.evaluations.where("created_at>?",@date)|@user.annotations.where("created_at>?",@date)).sort_by{|event|event.created_at}.reverse
		@events=WillPaginate::Collection.create(current_page, per_page, @events.length) do |pager|
  			pager.replace @events[pager.offset, pager.per_page].to_a
		end
	end

	def user_search
		current_page = params[:page] || 1
  		per_page = params[:per_page] || 10
  		@users=User.search(params[:search])
  		if @users
			@users=WillPaginate::Collection.create(current_page, per_page, @users.length) do |pager|
	  			pager.replace @users[pager.offset, pager.per_page].to_a
			end
		else
			respond_to do |format|
				format.html{redirect_to :back,notice:"Please Provide a Search Parameter"}
			end
			return

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
