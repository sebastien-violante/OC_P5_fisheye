import styles from "./page.module.css";
import { getAllPhotographers } from "./lib/prisma-db";
import Card from "@/components/Card/Card";
import { notFound } from 'next/navigation'
export default async function Home() {

  const allPhotographers = await getAllPhotographers()
  if(!allPhotographers) notFound()
  
  return (
    <section className={styles.section}>
      {allPhotographers.map(photographer => (<Card key={photographer.id} {...photographer}/>))} 
    </section>    
  );
}
