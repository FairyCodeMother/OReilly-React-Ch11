import React, {useEffect, useState} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';


// Currently, user loses login status upon reload.
//      Task: Have the login persist upon reloading and check if they're already logged in.
function App() {
    // Note: the State setters are storing new values..
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 4. Set it up with an anonymous arrow function and move in the
    //    function that gets and checks isLoggedIn from localStorage.
    useEffect(() => {
        // 2. So we want to check if the key/value pair exists upon rendering by looking
        //    in localStorage where we put the pair.
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

        // 3. We set isLoggedIn to true if the pair exists. But this will now trigger
        //    every time the App reloads, creating an infinite loop because it's set
        //    to false upon loading. Now we call useEffect!
        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    }, [])

  const loginHandler = (email, password) => {
      // 1. First we need to find somewhere to find the value we want to persist.
      //    We will use localStorage, a global object from the browser, to hold the value.
      //    The user will be logged in upon submission, but will still be lost if they
      //    reload the page/restart the App.
      //
      //    setItem( String, String )
      localStorage.setItem('isLoggedIn', '1')

    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
  };

    // 5. Add a way to clear the flag using the logoutHandler.
  const logoutHandler = () => {
      localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
