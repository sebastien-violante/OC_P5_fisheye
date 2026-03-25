import Image from "next/image";
import styles from "./page.module.css";
import { getAllPhotographers } from "./lib/prisma-db";


export default async function Home() {

  const allPhotographers = await getAllPhotographers()
  console.log(allPhotographers)

  return (
    <div className={styles.page}>
      <h1>Récupérations données</h1>
    </div>
  );
}
