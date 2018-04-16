module ErrorSerializer
  def self.serialize(object)
    full_errors = {}
    full_errors["full_messages"] = []
    object.errors.messages.map do |field, errors|
      full_errors[field] = errors.map { |error| error.capitalize }
      field_name = field.to_s.split("_").join(" ").capitalize
      errors.map do |error_message|
        full_errors["full_messages"] << [field_name, error_message].join(" ")
      end
    end
    full_errors["full_messages"] = full_errors["full_messages"].flatten
    full_errors
  end
end
