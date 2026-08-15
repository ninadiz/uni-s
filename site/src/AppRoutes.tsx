import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Objects from './pages/Objects'
import Prices from './pages/Prices'
import UiKit from './pages/UiKit'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="objects" element={<Objects />} />
        <Route path="prices" element={<Prices />} />
        <Route path="ui-kit" element={<UiKit />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
