import styles from "./styles.module.scss";

interface ButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: ButtonProps) {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
}
