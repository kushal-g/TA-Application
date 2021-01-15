class StudentController < ApplicationController
  def login
    email = params[:email]
    password = params[:password]
    puts params
    student = Student.where(email: email).first
    if student == nil
      render json:{msg:"STUDENT NOT FOUND"}
      return
    
    elsif student[:password] == password
      render json: student, status: :ok
    else
      render json: {msg:"INCORRECT PASSWORD"}
    end
  end

  def signup
    name = params[:name]
    email = params[:email]
    password = params[:password]

    student = Student.where(email: email).first
    if student == nil
      newStudent = Student.new(name: name, email: email, password: password)
      newStudent.save()
      render json: newStudent, status: :ok
    elsif
      render json:{msg:"USER ALREADY EXISTS"}, status: :ok
    end
  end

  def askDoubt
    student_id = params[:student_id]
    title = params[:title]
    body = params[:body]

    newDoubt = Doubt.new(title: title, body: body, student_id: student_id)
    newDoubt.save
    puts newDoubt
    render json: newDoubt, status: :ok
  end

  def fetchDoubts
    doubts = Doubt.all
    puts doubts
    doubts = doubts.map() do |doubt|
      student = Student.find(doubt[:student_id])
      comments = Comment.where("doubt_id = '#{doubt[:id]}'")
      comments = comments.map() do |comment|
        commentStudent = Student.find(comment[:student_id])
        comment.attributes.merge!(:name=>commentStudent[:name], :email=>commentStudent[:email])
      end
      if doubt[:resolved_at]
        finalHistory =History.where({doubt_id:doubt[:id]}).order('created_at DESC').first
        teacher = Teacher.find(finalHistory[:teacher_id])
      end
      doubt.attributes.merge!(:email=>student[:email],:name=>student[:name],:comments=>comments,:resolver=>teacher)
    end
    render json: doubts, status: :ok
  end

  def addComment
    newComment = Comment.new(doubt_id: params[:doubt_id], student_id: params[:student_id], body: 
      params[:body])
    newComment.save
      
    render json: newComment, status: :ok
  end

end
