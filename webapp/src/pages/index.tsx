import type { NextPage } from "next";
import Head from "next/head";
import { useMarketplaceContract } from "src/contexts/MarketplaceContract";
import { useNearWallet } from "src/contexts/NearWallet";

const Home: NextPage = () => {
  const { wallet, loading } = useNearWallet();
  const { contract } = useMarketplaceContract();

  if (contract) {
    contract.nft_tokens({ limit: 10 }).then((tokens: any) => {
      console.log("LOG", tokens);
    });
  }

  console.log("WALLET", wallet);
  console.log("CONTRACT", contract);

  return (
    <>
      <Head>
        <title>Amata World Marketplace</title>
        <meta name="description" content="An amazing marketplace" />
      </Head>

      <header>
        <h1>Welcome to Amata World - Marketplace</h1>

        <p>Your wallet</p>
      </header>
    </>
  );
};

export default Home;
