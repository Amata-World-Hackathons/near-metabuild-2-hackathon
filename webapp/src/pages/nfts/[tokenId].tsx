import Head from "next/head";
import { useRouter } from "next/router";
import LoadingIcon from "src/components/LoadingIcon";
import { useMarketplaceContractQuery } from "src/contexts/MarketplaceContract";

const NFTDetailPage = () => {
  const router = useRouter();
  const { data, loading } = useMarketplaceContractQuery<any>(
    "nft_token",
    {
      token_id: router.query.tokenId,
    },
    !router.query.tokenId
  );

  return (
    <>
      <Head>
        <title>Amata World Marketplace | Explore</title>
        <meta
          name="description"
          content="Explore all the collections we have"
        />
      </Head>

      {loading || true ? (
        <LoadingIcon className="absolute top-1/2 left-1/2" />
      ) : (
        <h1>{data.metadata.title}</h1>
      )}
    </>
  );
};

export default NFTDetailPage;
