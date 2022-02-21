import { MarketplaceContractProvider } from "src/contexts/MarketplaceContract";
import { NearWalletProvider } from "src/contexts/NearWallet";
import "src/globals.css";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentClass;
  pageProps: Record<string, unknown>;
}) {
  return (
    <NearWalletProvider>
      <MarketplaceContractProvider>
        <Component {...pageProps} />
      </MarketplaceContractProvider>
    </NearWalletProvider>
  );
}

export default MyApp;
