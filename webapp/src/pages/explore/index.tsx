import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import LoadingIcon from "src/components/LoadingIcon";
import { useMarketplaceContractQuery } from "src/contexts/MarketplaceContract";

const ExplorePage: NextPage = () => {
  const { data, loading } = useMarketplaceContractQuery<any[]>("nft_tokens", {
    limit: 10,
  });

  return (
    <>
      <Head>
        <title>Amata World Marketplace | Explore</title>
        <meta
          name="description"
          content="Explore all the collections we have"
        />
      </Head>

      <h1>Explore our collections</h1>

      <ul className="flex flex-row flex-wrap items-start">
        {loading ? (
          <LoadingIcon />
        ) : (
          data?.map((item) => (
            <li key={item.token_id} className="mr-4">
              <Link href={`/nfts/${item.token_id}`}>
                <a>
                  <section className="flex flex-col w-64 border-4 border-blue-500 rounded">
                    <div
                      className="h-48 bg-cover bg-center bg-no-repeat bg-gray-500"
                      style={{ backgroundImage: `url(${item.metadata.media})` }}
                    ></div>
                    <h3 className="p-2 text-lg">{item.metadata.title}</h3>
                    <p className="p-2 text-sm">{item.metadata.description}</p>
                    {/* {JSON.stringify(item)} */}
                  </section>
                </a>
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default ExplorePage;
