import Headers from "@/components/Header/Headers";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <>
      <Headers />    
    <main>
      <Component {...pageProps} />
    </main>

  </>
}
