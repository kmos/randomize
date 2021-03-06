import '@styles/main.css';
import type { AppProps  } from 'next/app'

function Application({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default Application