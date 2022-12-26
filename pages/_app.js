import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Plus_Jakarta_Sans } from "@next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-plusJakartaSans",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${plusJakartaSans.variable} font-sans`}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}
