class CreateFighters < ActiveRecord::Migration[6.1]
  def change
    create_table :fighters do |t|
      t.string :name
      t.bigint :count, default: 0
      t.bigint :fighter_number

      t.timestamps
    end
  end
end
