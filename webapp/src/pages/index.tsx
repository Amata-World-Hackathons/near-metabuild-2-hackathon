import type { NextPage } from "next";
import Head from "next/head";
import { useMarketplaceContract } from "src/contexts/MarketplaceContract";
import { useNearWallet } from "src/contexts/NearWallet";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Amata World Marketplace</title>
        <meta name="description" content="An amazing marketplace" />
      </Head>

      <h1>Welcome to Amata World&apos;s Marketplace</h1>
    </>
  );
};

export default HomePage;
