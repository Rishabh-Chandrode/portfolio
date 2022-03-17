import './App.css';
import "./components/header" ;
import Header from './components/header';
import About from './components/about';
import Bio from './components/bio';
import Accomplishment from './components/accomplishment';

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      <Bio />
      <Accomplishment />
    </div>
  );
}

export default App;
