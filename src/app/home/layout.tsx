import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }: any) => {
  return (
    <>
      <div className="flex flex-row bg-indigo-900">
        <Sidebar />
        <div className="w-full h-full">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
