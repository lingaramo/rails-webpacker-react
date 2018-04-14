class UserPolicy < ApplicationPolicy
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
