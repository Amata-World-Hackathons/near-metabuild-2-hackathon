import React, { useState, useEffect, useContext } from "react";
import * as nearApi from "near-api-js";

const NearWalletContext = React.createContext();

export const NearWalletProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [near, setNear] = useState(null);

  useEffect(async () => {
    const nearConnection = await nearApi.connect({
      networkId: process.env.NEXT_PUBLIC_NEAR_NETWORK_ID,
      keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: process.env.NEXT_PUBLIC_NEAR_NODE_URL,
      walletUrl: process.env.NEXT_PUBLIC_NEAR_WALLET_URL,
      helperUrl: process.env.NEXT_PUBLIC_NEAR_HELPER_URL,
      explorerUrl: process.env.NEXT_PUBLIC_NEAR_EXPLORER_URL,
    });

    const wallet = new nearApi.WalletConnection(nearConnection);

    setNear({ connection: nearConnection, wallet });
  }, []);

  return (
    <NearWalletContext.Provider
      value={{
        wallet: near?.wallet,
        connection: near?.connection,
        ready: !!near,
      }}
    >
      {children}
    </NearWalletContext.Provider>
  );
};

export const useNearWallet = () => {
  return useContext(NearWalletContext);
};
