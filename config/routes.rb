Rails.application.routes.draw do
  post 'student/login'
  post 'student/signup'
  post 'teacher/login'
  post 'teacher/signup'
  post 'student/askDoubt'
  get 'student/fetchDoubts'
  post 'student/addComment'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
