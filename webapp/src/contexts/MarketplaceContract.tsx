import React, { useState, useEffect, useContext } from "react";
import * as nearApi from "near-api-js";
import { useNearWallet } from "./NearWallet";

const MarketplaceContractContext = React.createContext();

export const MarketplaceContractProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { wallet } = useNearWallet();
  const [contract, setContract] = useState(null);

  useEffect(async () => {
    const account = wallet?.account();
    const nearContract = account
      ? new nearApi.Contract(
          account,
          process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID,
          {
            viewMethods: ["nft_tokens"],
            changeMethods: [],
            sender: account,
          }
        )
      : null;

    setContract(nearContract);
  }, [wallet]);

  return (
    <MarketplaceContractContext.Provider value={contract}>
      {children}
    </MarketplaceContractContext.Provider>
  );
};

export const useMarketplaceContract = () => {
  const contract = useContext(MarketplaceContractContext);

  return { contract, ready: !!contract };
};
