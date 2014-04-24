require 'spec_helper'
describe AnnotationsController do
	it "should save and render json" do 
		Annotation.any_instance.stubs(:valid?).returns(true)
		post 'create'
		
	end

end
