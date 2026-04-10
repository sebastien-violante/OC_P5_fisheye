import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { StateProvider } from "./providers/FocusProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: "Fisheye",
  description: "FishEye est un site web qui permet aux photographes indépendants de présenter leurs meilleurs travaux",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${dmSans.variable}`}>
      <body>
        <Header />
        <main>
          <StateProvider>
            {children}
          </StateProvider>
        </main>
      </body>
    </html>
  );
}
