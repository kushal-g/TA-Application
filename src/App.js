import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import StudentLogin from "./pages/Student/StudentLogin/StudentLogin";
import StudentSignup from "./pages/Student/StudentSignup.jsx/StudentSignup";
import TeacherLogin from "./pages/Teacher/TeacherLogin/TeacherLogin";
import TeacherSignup from "./pages/Teacher/TeacherSignup/TeacherSignup";
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/teacher" component={TeacherLogin} />
        <Route exact path="/teacher/signup" component={TeacherSignup} />
        <Route exact path="/student" component={StudentLogin} />
        <Route exact path="/student/signup" component={StudentSignup} />
      </Router>
    </div>
  );
}

export default App;
