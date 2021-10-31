class ShowerUsageController < ApplicationController
    # skip_before_action :verify_authenticity_token
    layout "shower_usage"

    def index
        @user = current_user
        @user_props = { 
            first_name: @user.first_name,
            last_name: @user.last_name,
            email: @user.email,
            user_id: @user.id 
        }
    end

    def save_shower_usage
        new_shower_usage = ShowerUsage.create!(shower_usage_params)
        if new_shower_usage
            render json: new_shower_usage
        else
            render json: new_shower_usage.errors
        end
    end

    private

    def shower_usage_params
        params.permit(:user_id, :minutes, :daily_gallons, :yearly_gallons)
    end
end
