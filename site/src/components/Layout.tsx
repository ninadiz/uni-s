import { Outlet } from 'react-router-dom'
import Cursor from './Cursor'
import Footer from './Footer'
import Header from './Header'
import PageMeta from './PageMeta'
import ScrollToTop from './ScrollToTop'

function Layout() {
  return (
    <>
      <ScrollToTop />
      <PageMeta />
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
