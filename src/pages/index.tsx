import { HomeContainer, Product } from "@/styles/pages/home"
import Image from "next/image"
import Head from "next/head"
import { KeenSliderInstance, useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { useState } from "react"
import { stripe } from "@/lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Link from "next/link"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  // const [localSlide, setLocalSlide] = useState<KeenSliderInstance>()
  const [slideIndex, setSlideIndex] = useState(0)

  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    initial: 0,
    slides: () => products.map((product, index) => {
      let origin
      switch (index) {
        case 0:
          origin = 0
          break;
        
        case (products.length - 1):
          origin = 0.5
          break;

        default:
          origin = 0.25
          break;
      }
      return({
        origin,
        size: 0.5,
        spacing: 0.05,
      })
    }),
    slideChanged: (slider: KeenSliderInstance) => {
      setSlideIndex(slider.track.details.rel)
    },
  })
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      
      <HomeContainer ref={sliderRef} className="keen-slider" css={{$$child: '2'}}>
        {products.map((product, index) => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className={slideIndex === index ? "keen-slider__slide active" : "keen-slider__slide"}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}