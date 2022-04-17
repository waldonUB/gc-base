import logo from './logo.svg'
import './App.css'
import BaseTest from './components/BaseTest.jsx'

const arr = ['waldon', 'waldon1', 'waldon2', 'waldon3']

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* 测试注释 */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="flex-row">
          {arr.map((item) => (
            <span key={item} className="name-text">
              {item}
            </span>
          ))}
        </div>
        <BaseTest />
      </header>
    </div>
  )
}

export default App
