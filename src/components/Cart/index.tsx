import { CartContext } from "@/contexts/CartContext";
import Image from "next/image";
import { useContextSelector } from "use-context-selector";
import { CartContainer, CartBackground, ProductsContainer, Product, CartFooter, ImageContainer } from "./styles";
import { useCheckoutResume } from './../../hooks/useCheckoutResume';
import { useState } from "react";
import axios from "axios";

interface CartProps {
    show: boolean
    changeShow: () => void
}

export function Cart({ show, changeShow }: CartProps) {
    const [cart, removeFromCart] = useContextSelector(CartContext, (context) => {
        return [context.cart,context.removeFromCart]
    })

    const checkoutResume = useCheckoutResume()

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyCart() {
        try {
            setIsCreatingCheckoutSession(true)
            const cartLineItems = cart.map((product) => {
                return {
                    price: product.defaultPriceId,
                    quantity: product.quantity
                }
            })
            const response = await axios.post('/api/checkout', {
                lineItems: cartLineItems
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (err) {
            // Conectar com DataDog ou Sentry
            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionar ao checkout')
        }
    }

    return (
        <>
        <CartContainer show={show}>
            <h4>Sacola de compras</h4>
            <ProductsContainer>
                {
                    cart.map(product => {
                        return (
                            <Product key={product.id}>
                                <ImageContainer>
                                    <Image src={product.imageUrl} width={102} height={93} alt="" />
                                </ImageContainer>
                                <div>
                                    <span>{product.name}</span>
                                    <strong>{new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(product.price / 100)}</strong>
                                    <a href="#" onClick={() => {removeFromCart(product.id)}}>Remover</a>
                                </div>
                            </Product>
                        )
                    })
                }
            </ProductsContainer>
            <CartFooter>
                <div>
                    <span>Quantidade</span>
                    <span>{checkoutResume.quantity} itens</span>
                    <strong>Valor total</strong>
                    <h4>{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(checkoutResume.total / 100)}</h4>
                </div>
                <button onClick={handleBuyCart} disabled={isCreatingCheckoutSession} >Finalizar compra</button>
            </CartFooter>
        </CartContainer>
        <CartBackground show={show} onClick={changeShow} />
        </>
    )
}