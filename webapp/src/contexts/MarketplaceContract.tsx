import React, { useState, useEffect, useContext } from "react";
import * as nearApi from "near-api-js";
import { useNearWallet } from "./NearWallet";

export interface MarketplaceContract {
  loading: boolean;
  error?: string;
  contract?: any;
}

const MarketplaceContractContext = React.createContext<MarketplaceContract>({
  loading: true,
});

export const MarketplaceContractProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { wallet } = useNearWallet();
  const [contract, setContract] = useState<nearApi.Contract | null>(null);

  useEffect(() => {
    async function setupContract() {
      const account = wallet?.account();
      const nearContract = account
        ? new nearApi.Contract(
            account,
            process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID!,
            {
              viewMethods: ["nft_tokens"],
              changeMethods: [],
              // sender: account,
            }
          )
        : null;

      setContract(nearContract);
    }

    setupContract();
  }, [wallet]);

  return (
    <MarketplaceContractContext.Provider
      value={{ contract, loading: !!contract }}
    >
      {children}
    </MarketplaceContractContext.Provider>
  );
};

export const useMarketplaceContract = () => {
  return useContext(MarketplaceContractContext);
};
