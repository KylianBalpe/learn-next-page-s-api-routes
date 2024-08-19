import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/layouts/Layout";
import { Toaster } from "@/components/ui/toaster";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}
