import { CartContext } from '@/contexts/CartContext';
import Image from 'next/image';
import { ShoppingBag } from 'phosphor-react';
import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import logoImg from '../../assets/logo.svg'
import { HeaderContainer } from './styles';
import { Cart } from '@/components/Cart';
import Link from "next/link";


export function Header() {
  const [show, setShow] = useState(false)
  const cart = useContextSelector(CartContext, (context) => {
    return context.cart
  })

  return (
    <>
      <HeaderContainer>
        <Link href={`/`} prefetch={false}>
          <Image src={logoImg} alt="Logo" />
        </Link>
        <button onClick={() => setShow(true)}>
          <ShoppingBag size={24} />
          {cart.length > 0 && <span>{cart.length}</span>}
        </button>
      </HeaderContainer>
      <Cart show={show} changeShow={() => setShow(false)} />
    </>
  )
}