import logo from './logo.svg'
import './App.css'
import './styles/base.css'
import Nav from './components/base/Nav.jsx'
import Top from './components/base/Top.jsx'
import Dashboard from './components/base/Dashboard.jsx'
import BaseDialog from './components/function/dialog/BaseDialog.jsx'
import TodoList from './components/function/todoList/index.jsx'
import SingleUpload from './components/function/upload/SingleUpload.jsx'
import BaseTest from './components/test/BaseTest.jsx'
import Father from './components/test/eventWays/Father.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routeConfig from './routers/routeConfig'

function App() {
  // todo waldon router should be custom
  function getRouterView(children) {
    return children.map((item) => <Route path={item.path} element={item.element}></Route>)
  }
  return (
    <div className="App">
      <Top />
      <div className="flex-wrapper">
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/dialog/BaseDialog" element={<BaseDialog />}></Route>
            <Route path="/upload/SingleUpload" element={<SingleUpload />}></Route>
            <Route path="/test/BaseTest" element={<BaseTest />}></Route>
            <Route path="/test/eventWays" element={<Father />}></Route>
            <Route path="/TodoList" element={<TodoList />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
