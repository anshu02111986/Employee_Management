class CreatePersonalData < ActiveRecord::Migration[7.1]
  def change
    create_table :personal_data do |t|
      t.string :first_name, limit: 25, null: false
      t.string :last_name, limit: 50, null: false
      t.string :nick_name
      t.string :email_address, null: false
      t.string :phone_number, null: false

      t.timestamps
    end

    add_index :personal_data, :email_address, unique: true
  end
end
