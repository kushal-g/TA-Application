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

  def fetchUnresolvedDoubts
    doubts = Doubt.where({resolved_at:nil})
    doubtsArray = Array.new()
    doubts.each() do |doubt|
      history = History.where({doubt_id:doubt[:id]}).order('created_at DESC').first
      if history == nil #No one has taken it up yet
        doubtsArray.append(doubt)
      elsif history[:escalated] #Somebody took it up but then escalated it
        doubtsArray.append(doubt)
      end
    end
    render json: doubtsArray, status: :ok
  end

  def fetchDoubt
    doubt = Doubt.find(params[:doubt_id])
    student = Student.find(doubt[:student_id])
    comments = Comment.where("doubt_id = '#{doubt[:id]}'")
    comments = comments.map() do |comment|
      commentStudent = Student.find(comment[:student_id])
      comment.attributes.merge!(:name=>commentStudent[:name], :email=>commentStudent[:email])
    end
    doubt = doubt.as_json
    doubt[:email] = student[:email]
    doubt[:name] = student[:name]
    doubt[:comments] = comments

    render json: doubt , status: :ok
  end

  def acceptDoubt
    history = History.new(doubt_id:params[:doubt_id],teacher_id:params[:teacher_id], escalated:false)
    history.save
    render json: history, status: :ok
  end

  def fetchMyDoubts
    puts params
    doubts = Doubt.where({resolved_at:nil})
    doubtsArray = Array.new()
    doubts.each() do |doubt|
      history = History.where({doubt_id:doubt[:id]}).order('created_at DESC').first
      if history
        puts "TEACHER_ID"
        
        if (history[:teacher_id] == params[:teacher_id].to_i) and (!history[:escalated]) 
          doubtsArray.append(doubt)
        end
      end
    end
    render json: doubtsArray, status: :ok
  end

  def answer 
    doubt = Doubt.find(params[:doubt_id])
    doubt[:answer] = params[:answer]
    doubt[:resolved_at] = Time.now
    doubt.save()
    render json: doubt, status: :ok
  end

  def escalate
    finalHistory = History.where({doubt_id:params[:doubt_id]}).order('created_at DESC').first
    finalHistory[:escalated] = true
    finalHistory.save
    render json: finalHistory, status: :ok
  end
end
