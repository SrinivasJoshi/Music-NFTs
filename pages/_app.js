import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import '../styles/globals.css';

const { chains, provider } = configureChains(
	[chain.polygonMumbai],
	[
		jsonRpcProvider({
			rpc: () => ({ http: 'https://rpc-mumbai.matic.today/' }),
		}),
	]
);

const { connectors } = getDefaultWallets({
	appName: 'MusicNFTs',
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
