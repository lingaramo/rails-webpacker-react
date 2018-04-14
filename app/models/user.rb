class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :password_confirmation, presence: true, on: :create

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
end
