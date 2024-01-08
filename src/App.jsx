import { ToastContainer } from "react-toastify";
import Navigation from "./contexts/Navigation";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <section
      style={{ background: `url(${"/images/ellipse.png"}), #D1D1D6` }}
      className="relative bg-cream flex flex-col items-center h-fit lg:h-screen justify-between"
    >
      <Navbar />
      <ToastContainer />
      <Navigation />
      <Footer />
    </section>
  );
}

export default App;
