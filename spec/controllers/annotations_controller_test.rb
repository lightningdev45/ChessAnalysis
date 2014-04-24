require 'spec_helper'
describe AnnotationsController, "creating a new annotation" do
	it "should save and render json" do 
		post 'create'
		Annotation.any_instance.stubs(:valid?).returns(true)

	end

end
