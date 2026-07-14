import { Outlet } from 'react-router-dom'
import Cursor from './Cursor'
import Footer from './Footer'
import Header from './Header'

function Layout() {
  return (
    <>
      <Cursor />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
