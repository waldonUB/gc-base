import App from '../App'
import Dashboard from '../components/Dashboard'
import BaseDialog from '../components/dialog/BaseDialog'
import SingleUpload from '../components/upload/SingleUpload'

const routeConfig = [
  {
    path: '/',
    component: App,
    indexRoute: { component: Dashboard },
    childRoutes: [
      { path: 'dialog', component: BaseDialog },
      {
        path: 'upload',
        component: SingleUpload,
      },
    ],
  },
]

export default routeConfig
