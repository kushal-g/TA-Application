class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.integer :doubt_id
      t.text :body
      t.integer :student_id

      t.timestamps
    end
  end
end
