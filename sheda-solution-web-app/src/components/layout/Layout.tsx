import Header from "./Header";
import Footer from "./Footer";

//layout that structures the page
const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;