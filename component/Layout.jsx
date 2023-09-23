import { Outlet } from "react-router-dom"
import Header from '../component/Header'
function Layout() {
  return (
    <main>
        <Header />
        <Outlet />
    </main>
)
}

export default Layout