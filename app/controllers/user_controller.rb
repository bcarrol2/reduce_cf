class UserController < ApplicationController
  def index
    if current_user
      @current_user = current_user
    end
  end
end
