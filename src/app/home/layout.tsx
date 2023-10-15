
import Home from "./page"
import Sidebar from "./Sidebar"
const Layout = ({ children }) => {
    return (
        <>
        <div className="flex flex-row">
        <Sidebar />
        <div className="w-full h-full">
        {children}
        </div>
        </div>
        </>
    )
}

export default Layout