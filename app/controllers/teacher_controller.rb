class TeacherController < ApplicationController
  def login
    email = params[:email]
    password = params[:password]
    puts params
    teacher = Teacher.where(email: email).first
    if teacher == nil
      render json:{msg:"TEACHER NOT FOUND"}
      return
    
    elsif teacher[:password] == password
      render json: teacher, status: :ok
    else
      render json: {msg:"INCORRECT PASSWORD"}
    end
  end

  def signup
    name = params[:name]
    email = params[:email]
    password = params[:password]

    puts params
    teacher = Teacher.where(email: email).first
    if teacher == nil
      newTeacher = Teacher.new(name: name, email: email, password: password)
      newTeacher.save()

      render json: newTeacher, status: :ok
    elsif
      render json:{msg:"USER ALREADY EXISTS"}, status: :ok
    end
  end
end
