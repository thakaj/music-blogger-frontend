import './App.css'
import Login from './components/Login'
import {Switch, Route} from 'react-router-dom'
import SignupPage from './components/SignUpPage';
import PostList from './components/PostList';
import {useEffect, useState} from 'react'
import LogoutButton from './components/LogoutButton';

function App() {
  
  const [user, setUser] = useState(false)
  useEffect(()=> {
    fetch("/me")
    .then(r => {
      if (r.ok) {
        r.json().then(user => {
          console.log("logged in: ", user)
          setUser(user)
        },[])
      } else {
        console.log("No user is logged in")
      }
    })
  },[])
  function handleLogin(user){
    setUser(user)
  }
  function handleLogout(){
    setUser(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Switch> 
          <Route exact path= "/login" >
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path ="/signup">
            <SignupPage />
          </Route>
          <Route exact path="/posts">
            <PostList />
          </Route>
        </Switch>
        <LogoutButton handleLogout={handleLogout}/>
      </header>
    </div>
  );
}

export default App;
