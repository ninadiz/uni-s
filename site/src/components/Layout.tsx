import { Outlet } from 'react-router-dom'
import Cursor from './Cursor'
import FloatingCall from './FloatingCall'
import Footer from './Footer'
import Header from './Header'
import PageMeta from './PageMeta'
import ScrollReveal from './ScrollReveal'
import ScrollToTop from './ScrollToTop'

function Layout() {
  return (
    <>
      <ScrollToTop />
      <ScrollReveal />
      <PageMeta />
      <Cursor />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingCall />
    </>
  )
}

export default Layout
