import { GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { FormatCurrency } from "../helpers/Currency";
import { stripe } from "../services/stripe";

import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  const [session] = useSession();
  return (
    <>
      <Head>
        <title> Home | ig.news </title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          {session ? (
            <span>👏 Hey, {session.user.name}</span>
          ) : (
            <span>👏 Hey, welcome</span>
          )}

          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the plublications <br />
            <span>for {product.amount} month.</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1J1fMoGnbhYCX5IKOCDQdUjO", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: FormatCurrency(price.unit_amount / 100),
  };
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
