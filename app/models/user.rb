class User < ActiveRecord::Base
  self.per_page = 40

  # Include default devise modules. Others available are:
  # :confirmable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :lockable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :password_confirmation, presence: true, on: :create
  validates_length_of :name, maximum: 200, allow_blank: true
  validates :email, uniqueness: { message: "has already been taken" }

  USER = "user".freeze
  MANAGER = "manager".freeze
  ADMIN = "admin".freeze

  ROLES = [USER, MANAGER, ADMIN]

  validates_inclusion_of :role, in: ROLES, message: 'invalid. Must be "user", "manager" or "admin".'

  def admin?
    self.role == ADMIN
  end

  def manager?
    self.role == MANAGER
  end

  def user?
    self.role == USER
  end

  def self.search_by(query_string)
    return self.all if query_string == "" || query_string.nil?
    query_string = ActiveRecord::Base.sanitize_sql_like(query_string)
    id = query_string
    self.where("email LIKE :query OR name LIKE :query OR id = :id", id: integer_or_nil(query_string), query: "%#{query_string}%")
  end

  def self.integer_or_nil(str)
    Integer(str || '')
  rescue ArgumentError
    nil
  end
end
