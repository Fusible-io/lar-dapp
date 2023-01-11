import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import { Inter, Plus_Jakarta_Sans } from "@next/font/google";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

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

const { chains, provider } = configureChains(
  [goerli],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'LAR DAPP',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <main className={`${plusJakartaSans.variable} ${inter.variable} font-sans`}>
          <Navbar />
          <Component {...pageProps} />
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
