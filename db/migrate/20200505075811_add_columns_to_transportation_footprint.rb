class AddColumnsToTransportationFootprint < ActiveRecord::Migration[6.0]
  def change
    add_column :transportation_footprints, :miles_driven_per_year, :integer
    add_column :transportation_footprints, :metric_ton_carbon_dioxide_output, :float
  end
end
