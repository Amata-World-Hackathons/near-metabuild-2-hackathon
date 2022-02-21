import { MarketplaceContractProvider } from "src/contexts/MarketplaceContract";
import { NearWalletProvider } from "src/contexts/NearWallet";
import applyLayout from "src/components/applyLayout";
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
        {applyLayout(<Component {...pageProps} />)}
      </MarketplaceContractProvider>
    </NearWalletProvider>
  );
}

export default MyApp;
