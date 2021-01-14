Rails.application.routes.draw do
  post 'student/login'
  post 'student/signup'
  post 'teacher/login'
  post 'teacher/signup'
  post 'student/askDoubt'
  get 'student/fetchDoubts'
  post 'student/addComment'
  get 'teacher/fetchUnresolvedDoubts'
  post 'teacher/acceptDoubt'
  get 'teacher/fetchMyDoubts'
  get 'teacher/fetchDoubt'
  post 'teacher/answer'
  post 'teacher/escalate'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
