class TransportationFootprintController < ApplicationController
    skip_before_action :verify_authenticity_token
    layout "transportation_footprint"

    def index
        @user = current_user
        user_props = { 
            first_name: @user.first_name,
            last_name: @user.last_name,
            email: @user.email,
            id: @user.id 
        }
    end

    def save_transportation_footprint
        new_carbon_footprint = TransportationFootprint.create!(transportation_footprint_params)
        if new_carbon_footprint
            render json: new_carbon_footprint
        else
            render json: new_carbon_footprint.errors
        end
    end

    private

    def transportation_footprint_params
        params.permit(:user_id, :mpg, :miles_driven_per_year, :metric_ton_carbon_dioxide_output)
    end
end
