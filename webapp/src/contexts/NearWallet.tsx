import React, { useState, useEffect, useContext } from "react";
import * as nearApi from "near-api-js";
import { useRouter } from "next/router";
import LoadingIcon from "src/components/LoadingIcon";
import { NextPage } from "next";

export interface NearWallet {
  error?: string;
  loading: boolean;
  wallet?: nearApi.WalletConnection;
  connection?: any;
}

const NearWalletContext = React.createContext<NearWallet>({ loading: true });

export const NearWalletProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const router = useRouter();
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

  useEffect(() => {
    // remove the sensitive query parts from the URL
    if (near?.wallet.isSignedIn()) {
      if (router.query.account_id || router.query.all_keys) {
        const { account_id, all_keys, ...otherParts } = router.query;
        router.replace({
          query: otherParts,
          pathname: router.pathname,
        });
      }
    }
  }, [near?.wallet, router]);

  return (
    <NearWalletContext.Provider
      value={{
        wallet: near?.wallet,
        connection: near?.connection,
        loading: !near,
      }}
    >
      {children}
    </NearWalletContext.Provider>
  );
};

export const useNearWallet = (): NearWallet => {
  return useContext(NearWalletContext);
};

export const requireWalletConnection = (
  Component: React.ComponentClass | NextPage
) => {
  return function RequireWalletConnection(props: Record<string, unknown>) {
    const { loading, wallet } = useNearWallet();

    return loading ? (
      <LoadingIcon className="absolute top-1/2 left-1/2" />
    ) : !wallet?.isSignedIn() ? (
      <section className="flex flex-col items-center justify-center h-full">
        <h1>This page requires a wallet connection</h1>

        <button
          className="mt-8 p-4 border-2 rounded border-red-500"
          onClick={() => wallet?.requestSignIn()}
        >
          Connect your wallet
        </button>
      </section>
    ) : (
      <Component {...props} />
    );
  };
};
