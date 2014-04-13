class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :profile_name, :dummy_msg

  #this just to illustrate active_model_serializers feature
  #make sure to list in attributes call above
  def dummy_msg
    "JUST HERE FOR FUN W #{object.profile_name}"
  end

end