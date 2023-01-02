import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import { Inter, Plus_Jakarta_Sans } from "@next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-plusJakartaSans",
});

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${plusJakartaSans.variable} ${inter.variable} font-sans`}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}
