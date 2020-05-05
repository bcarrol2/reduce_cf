class CreateTransportationFootprints < ActiveRecord::Migration[6.0]
  def change
    create_table :transportation_footprints do |t|
      t.integer :miles
      t.integer :mpg
      t.integer :cdo
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
