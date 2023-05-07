import { CartContext } from "@/contexts/CartContext";
import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer, ImagesWrapper } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Stripe from "stripe";
import { useContextSelector } from "use-context-selector";

interface SuccessProduct {
    name: string
    imageUrl: string
}

interface SuccessProps {
    customerName: string
    products: SuccessProduct[]
}

export default function Success({customerName, products}: SuccessProps) {
    const clearCart = useContextSelector(CartContext, (context) => {
        return context.clearCart
    })

    useEffect(() => {
        clearCart()
    }, [clearCart])

    return(
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>

                <meta name="robots" content="noindex" />
            </Head>
            <SuccessContainer>
                <h1>Compra Efetuada!</h1>

                <ImagesWrapper>
                    {products.map((product) => {
                        return(
                            <ImageContainer key={product.imageUrl}>
                                <Image src={product.imageUrl} width={120} height={110} alt="" />
                            </ImageContainer>
                        )
                    })}
                </ImagesWrapper>
                <p>
                    Uhuul <strong>{customerName}</strong>, sua compra de <strong>{products.length}</strong> camisetas já está a caminho da sua casa
                </p>

                <Link href="/">
                    Voltar ao catálogo
                </Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details?.name
    // const product = session.line_items?.data[0].price?.product as Stripe.Product
    const lineItems = session.line_items?.data
    const products = lineItems?.map((item) => {
        const product = item.price?.product as Stripe.Product
        return {
            name: product.name,
            imageUrl: product.images[0],

        }
    })

    return {
        props: {
            customerName,
            products: products        
        }
    }

    // const product = session.line_items?.data[0].price?.product as Stripe.Product

    // return {
    //     props: {
    //         customerName,
    //         product: {
    //             name: product.name,
    //             imageUrl: product.images[0]
    //         }
    //     }
    // }
}