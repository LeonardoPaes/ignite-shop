import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { useRouter } from "next/router"
import { GetStaticPaths, GetStaticProps } from 'next';
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head"
import { useContextSelector } from "use-context-selector";
import { CartContext } from "@/contexts/CartContext";

interface ProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        price: number
        description: string
        defaultPriceId: string
    }
}

export default function Product({product}: ProductProps) {
    const addToCart = useContextSelector(CartContext, (context) => {
        return context.addToCart
    })
    // const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    // async function handleBuyProduct() {
    //     try {
    //         setIsCreatingCheckoutSession(true)
    //         const response = await axios.post('/api/checkout', {
    //             priceId: product.defaultPriceId
    //         })

    //         const { checkoutUrl } = response.data

    //         window.location.href = checkoutUrl
    //     } catch (err) {
    //         // Conectar com DataDog ou Sentry
    //         setIsCreatingCheckoutSession(false)
    //         alert('Falha ao redirecionar ao checkout')
    //     }
    // }

    const { isFallback } = useRouter()

    if (isFallback) {
        return <p>Loading...</p>
    }

    return(
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>
        
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(product.price / 100)}</span>

                    <p>{product.description}</p>

                    {/* <button onClick={() => addToCart({...product, quantity: 1})} disabled={isCreatingCheckoutSession}> */}
                    <button onClick={() => addToCart({...product, quantity: 1})}>
                        Colocar na sacola
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Buscar os produtos mais vendidos / acessados

    return {
        paths: [
            { params: {id: "prod_NmQDrd9rgNCUFp"} }
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params!.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price
    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: price.unit_amount,
                description: product.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}