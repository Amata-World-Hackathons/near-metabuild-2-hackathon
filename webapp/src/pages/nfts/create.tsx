import Head from "next/head";
import slugify from "slugify";
import { Formik, Field, Form } from "formik";
import {
  requireWalletConnection,
  useNearWallet,
} from "src/contexts/NearWallet";
import { useMarketplaceContractMutation } from "src/contexts/MarketplaceContract";

const CreateNFTPage = () => {
  const { wallet } = useNearWallet();
  const mintNFT = useMarketplaceContractMutation("nft_mint");

  return (
    <>
      <Head>
        <title>Amata World Marketplace | Create</title>
        <meta name="description" content="Create your own NFTs" />
      </Head>

      <section>
        <h1>Create your own NFTs</h1>

        <Formik
          initialValues={{
            name: "",
            description: "",
            imageUrl: "",
            latitude: 0,
            longitude: 0,
          }}
          onSubmit={async (values) => {
            const result = await mintNFT({
              title: values.name,
              token_id:
                slugify(values.name) + "-" + Math.round(1e6 * Math.random()),
              receiver_id: wallet?.account().accountId,
              description: values.description,
              media_url: values.imageUrl,
              latitude: values.latitude,
              longitude: values.longitude,
              token_metadata: {},
            });

            console.log("RES", result);
          }}
        >
          <Form>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description">Description</label>
              <Field name="description" type="text" as="textarea" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="imageUrl">Image URL</label>
              <Field name="imageUrl" type="text" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="latitude">Latitude</label>
              <Field name="latitude" type="text" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="longitude">Longitude</label>
              <Field name="longitude" type="text" />
            </div>

            <button
              className="mt-8 px-10 py-4 font-bold bg-white rounded-full"
              type="submit"
            >
              Create
            </button>
          </Form>
        </Formik>
      </section>
    </>
  );
};

export default requireWalletConnection(CreateNFTPage);
