class CreateDoubts < ActiveRecord::Migration[6.1]
  def change
    create_table :doubts do |t|
      t.string :title
      t.text :body
      t.integer :student_id
      t.datetime :resolved_at
      t.text :answer

      t.timestamps
    end
  end
end
