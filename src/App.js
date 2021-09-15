import './App.css'
import Homepage from './components/HomePage';
import PostList from './components/PostList';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Homepage/>
        <PostList />
      </header>
    </div>
  );
}

export default App;
