class UserController < ApplicationController
  def index
    byebug
    if current_user
      @saved_shower_usages = current_user.shower_usages
      @saved_transportation_footprints = current_user.transportation_footprints
    end
  end
end
