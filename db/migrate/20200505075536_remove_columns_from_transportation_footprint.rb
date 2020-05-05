class RemoveColumnsFromTransportationFootprint < ActiveRecord::Migration[6.0]
  def change

    remove_column :transportation_footprints, :miles, :integer

    remove_column :transportation_footprints, :cdo, :integer
  end
end
