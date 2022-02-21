import classnames from "classnames";
import Head from "next/head";
import Link from "next/link";
import { useNearWallet } from "src/contexts/NearWallet";

export interface SiteHeaderProps {
  className?: string;
}

const SiteHeader = ({ className }: SiteHeaderProps) => {
  const { wallet, loading } = useNearWallet();

  return (
    <header className={classnames("flex flex-row justify-between p-2")}>
      <Link href="/">
        <a>
          <h2 className="p-2 flex-none">Amata World - Marketplace</h2>
        </a>
      </Link>

      <section>
        <Link href="/explore">
          <a className="py-2 px-4">Explore</a>
        </Link>

        <Link href="/nfts/create">
          <a className="py-2 px-4">Create</a>
        </Link>

        {!wallet || !wallet.isSignedIn() ? (
          <button
            className="py-2 px-4 rounded border-2 border-red-500"
            onClick={() => {
              wallet?.requestSignIn();
            }}
          >
            Connect your wallet
          </button>
        ) : (
          <>
            <Link href="/my-wallet/collections">
              <a className="py-2 px-4 capitalize">My collections</a>
            </Link>

            <button
              className="px-4"
              onClick={() => {
                wallet.signOut();
                setTimeout(() => window.location.reload(), 300);
              }}
            >
              Logout
            </button>
          </>
        )}
      </section>
    </header>
  );
};

export default function applyLayout(page: React.ReactNode) {
  return (
    <div className="flex flex-col h-screen w-screen justify-center overflow-hidden">
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <SiteHeader />

      <section className="p-8 flex-1 overflow-x-hidden overflow-y-auto">
        {page}
      </section>
    </div>
  );
}
