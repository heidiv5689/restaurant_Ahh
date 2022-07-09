class AddFirstAndLastNameToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :first, :string
    add_column :users, :last, :string
  end
end
