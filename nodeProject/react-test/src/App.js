import logo from './logo.svg'
import './App.css'
import './styles/base.css'
import Nav from './components/base/Nav.jsx'
import Top from './components/base/Top.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routeConfig from './routers/routeConfig'

function App() {
  function convertTree(routes) {
    const children = []
    const res = []
    if (!routes.length) {
      return []
    }
    for (const item of routes) {
      res.push(item)
      if (item.children && item.children.length) {
        children.push(...item.children)
      }
    }
    res.push(...convertTree(children))
    return res
  }
  function getRouterView(routes) {
    const arr = convertTree(routes)
    return arr.map((item) => <Route key={item.key} path={item.path} element={item.element}></Route>)
  }

  return (
    <div className="App">
      <Top />
      <div className="flex-wrapper">
        <BrowserRouter>
          <Nav />
          <Routes>{getRouterView(routeConfig)}</Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
