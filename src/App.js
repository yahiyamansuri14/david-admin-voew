import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes';
import { useDispatch } from "react-redux"
import React from 'react';
import { checkAuth } from './feature/auth/authThunk';



function App() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
      <div className="App">
        <AppRoutes />
      </div>
  );
}

export default App;
