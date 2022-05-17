import React, { useEffect, useContext, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import Users from './pages/Users';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check } from './http/userAPI';
import Loader from './components/Loader/Loader';

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      /* user.setUser(true) */
      /* user.setIsAuth(true) */
      /* console.log(user) */
    }).finally(() => setLoading(false))

  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
