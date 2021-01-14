class CreateHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :histories do |t|
      t.integer :doubt_id
      t.integer :teacher_id
      t.boolean :escalated

      t.timestamps
    end
  end
end
