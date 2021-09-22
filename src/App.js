import './App.css'
import Login from './components/Login'
import {Switch, Route} from 'react-router-dom'
import SignupPage from './components/SignUpPage';
import PostList from './components/PostList';
import {useEffect, useState} from 'react'
import NavBar from './components/NavBar';

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
        <NavBar user={user} handleLogout={handleLogout}/>
        <Switch> 
          <Route exact path= "/login" >
            <Login handleLogin={handleLogin} user={user} />
          </Route>
          <Route exact path ="/">
            <SignupPage user={user} />
          </Route>
          <Route exact path="/posts">
            <PostList user={user}/>
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
