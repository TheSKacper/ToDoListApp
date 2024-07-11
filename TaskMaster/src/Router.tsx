import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TaskList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
