import './App.css';
import Title from './Components/Title';
import TodoList from './Components/Main/index.js';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Title/>
      <TodoList/>
      <Footer/>
    </div>
  );
}

export default App;