import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import TasksFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRouter from "./ProtectedRoute";

//el uso de AuthProvider espera que todo puedan usar el contexto
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          
          <Route element= {<ProtectedRouter/>}> 
            <Route path='/tasks' element={<TasksPage/>}/>
            <Route path='/add-task' element={<TasksFormPage/>}/>
            <Route path='/tasks/:id' element={<TasksFormPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
          </Route>
        </Routes>  
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;