import type { AppProps } from 'next/app'
import { globalStyles } from './../styles/global';

import logoImg from '../assets/logo.svg'
import { Container, Header } from './../styles/pages/app';
import Image from 'next/image';
import { ShoppingBag } from 'phosphor-react';

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="Logo" />
        <button>
          <ShoppingBag size={24} />
        </button>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
