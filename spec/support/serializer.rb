module Serializer
  def self.ams(ams_instance)
    ActiveModelSerializers::Adapter.create(ams_instance).to_json
  end
end
