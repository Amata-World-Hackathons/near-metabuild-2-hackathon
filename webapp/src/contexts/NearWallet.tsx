import React, { useState, useEffect, useContext } from "react";
import * as nearApi from "near-api-js";

export interface NearWallet {
  error?: string;
  loading: boolean;
  wallet?: any;
  connection?: any;
}

const NearWalletContext = React.createContext<NearWallet>({ loading: true });

export const NearWalletProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [near, setNear] = useState<{
    wallet: nearApi.WalletConnection;
    connection: any;
  } | null>(null);

  useEffect(() => {
    async function setupWallet() {
      const nearConnection = await nearApi.connect({
        networkId: process.env.NEXT_PUBLIC_NEAR_NETWORK_ID!,
        headers: {},
        keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: process.env.NEXT_PUBLIC_NEAR_NODE_URL!,
        walletUrl: process.env.NEXT_PUBLIC_NEAR_WALLET_URL!,
        helperUrl: process.env.NEXT_PUBLIC_NEAR_HELPER_URL!,
      });

      const wallet = new nearApi.WalletConnection(
        nearConnection,
        "amata-world-nft-marketplace-prototype"
      );

      setNear({ connection: nearConnection, wallet });
    }

    setupWallet();
  }, []);

  return (
    <NearWalletContext.Provider
      value={{
        wallet: near?.wallet,
        connection: near?.connection,
        loading: !!near,
      }}
    >
      {children}
    </NearWalletContext.Provider>
  );
};

export const useNearWallet = (): NearWallet => {
  return useContext(NearWalletContext);
};
