# class UserSerializer
class UserSerializer < ActiveModel::Serializer

  # include FastJsonapi::ObjectSerializer
  attributes :name, :email, :role, :id
end
