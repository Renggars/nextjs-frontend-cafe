import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/landing/Hero";
import Favorit from "./components/landing/Favorit";
import OurValues from "./components/landing/OurValues";
import LiveMusic from "./components/landing/LiveMusic";
import HangoutView from "./components/landing/View";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Favorit />
      <OurValues />
      <LiveMusic />
      <HangoutView />
      <Footer />
    </div>
  );
}
