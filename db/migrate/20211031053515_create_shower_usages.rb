class CreateShowerUsages < ActiveRecord::Migration[6.0]
  def change
    create_table :shower_usages do |t|
      t.integer :minutes
      t.integer :daily_gallons
      t.integer :yearly_gallons
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
