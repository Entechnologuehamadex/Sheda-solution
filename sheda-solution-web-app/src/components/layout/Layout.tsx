import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
      {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
