import { NextPage } from "next";
import Head from "next/head";
import { requireWalletConnection } from "src/contexts/NearWallet";

const MyCollectionsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Amata World Marketplace | Explore</title>
        <meta
          name="description"
          content="Explore all the collections we have"
        />
      </Head>

      <h1>My collection</h1>
    </>
  );
};

export default requireWalletConnection(MyCollectionsPage);
