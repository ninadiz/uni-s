import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Objects from './pages/Objects'
import ObjectDetail from './pages/ObjectDetail'
import Prices from './pages/Prices'
import UiKit from './pages/UiKit'
import NotFound from './pages/NotFound'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="objects" element={<Objects />} />
        <Route path="objects/:slug" element={<ObjectDetail />} />
        <Route path="prices" element={<Prices />} />
        <Route path="ui-kit" element={<UiKit />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
