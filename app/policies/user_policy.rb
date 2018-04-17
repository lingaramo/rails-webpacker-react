class UserPolicy < ApplicationPolicy

  def permitted_attributes
    safe_attrs = [:name, :email, :password, :password_confirmation]
    superuser_attrs = [:role]

    if user.admin?
      safe_attrs | superuser_attrs
    else
      safe_attrs
    end
  end

  def create?
    user.admin? || user.manager?
  end

  def update?
    user.admin? ||
    user.manager? && record.role == 'user' ||
    user.id == record.id
  end

  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      elsif user.manager?
        scope.where(role: 'user')
      else
        scope.where(id: user.id)
      end
    end
  end
end
