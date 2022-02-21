import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import * as nearApi from "near-api-js";
import { useNearWallet } from "./NearWallet";
import { useRouter } from "next/router";

export interface MarketplaceContract {
  loading: boolean;
  error?: string;
  view?: nearApi.Contract;
  change?: nearApi.Contract;
}

export type ViewMethod = "nft_tokens" | "nft_token";
export type ChangeMethod = "nft_mint";

const MarketplaceContractContext = React.createContext<MarketplaceContract>({
  loading: true,
});

export const MarketplaceContractProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { wallet, connection } = useNearWallet();
  const [contracts, setContract] = useState<{
    view?: nearApi.Contract;
    change?: nearApi.Contract;
  }>({});

  useEffect(() => {
    async function setupContract() {
      const account2 = new nearApi.Account(
        connection,
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID!
      );

      const account = wallet?.account();

      const nearContract = account
        ? new nearApi.Contract(
            account,
            process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID!,
            {
              viewMethods: ["nft_tokens", "nft_token"],
              changeMethods: ["nft_mint"],
            }
          )
        : undefined;

      const nearContract2 = account
        ? new nearApi.Contract(
            account2,
            process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID!,
            {
              viewMethods: ["nft_tokens", "nft_token"],
              changeMethods: ["nft_mint"],
            }
          )
        : undefined;

      setContract({
        view: nearContract,
        change: nearContract2,
      });
    }

    setupContract();
  }, [wallet, connection]);

  return (
    <MarketplaceContractContext.Provider
      value={{
        view: contracts.view,
        change: contracts.change,
        loading: !contracts.view,
      }}
    >
      {children}
    </MarketplaceContractContext.Provider>
  );
};

export const useMarketplaceContract = () => {
  return useContext(MarketplaceContractContext);
};

interface QueryResult<T> {
  loading: boolean;
  error?: string;
  data?: T;
}

export const useMarketplaceContractQuery = <T extends any>(
  method: ViewMethod,
  args?: Record<string, unknown>,
  skip?: boolean
): QueryResult<T> => {
  const { view } = useMarketplaceContract();
  const [queryResult, setQueryResult] = useState<{
    loading: boolean;
    data?: T;
  }>({ loading: true });

  const argKey = useMemo(() => JSON.stringify(args), [args]);

  useEffect(() => {
    async function callContract() {
      if (!view) return;
      setQueryResult({ loading: true });

      const data = await (view as any)[method].call(view, args);

      setQueryResult({
        data,
        loading: false,
      });
    }

    if (!skip) {
      callContract();
    }
  }, [method, argKey, view, skip]);

  return queryResult;
};

export const useMarketplaceContractMutation = <T extends any>(
  method: ChangeMethod
): ((args: Record<string, unknown>) => Promise<void>) => {
  const { change } = useMarketplaceContract();

  const mutation = useCallback(
    async (args) => {
      if (!change) return;

      return (change as any)[method].call(change, args);
    },
    [method, change]
  );

  return mutation;
};
