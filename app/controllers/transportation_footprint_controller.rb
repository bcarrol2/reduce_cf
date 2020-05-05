class TransportationFootprintController < ApplicationController
    skip_before_action :verify_authenticity_token
    layout "transportation_footprint"

    def index
        @user = current_user
        @user_props = { user: @user.email, user_id: @user.id }
    end

    def save_transportation_footprint
        new_carbon_footprint = TransportationFootprint.create!(transportation_footprint_params)
        render json: { carbon_footprint: new_carbon_footprint }
    end

    private

    def transportation_footprint_params
        params.permit(:user_id, :mpg, :miles_driven_per_year, :metric_ton_carbon_dioxide_output)
    end
end
