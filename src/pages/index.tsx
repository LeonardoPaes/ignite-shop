import { ArrowButton, HomeContainer, Product } from "@/styles/pages/home"
import Image from "next/image"
import Head from "next/head"
import { KeenSliderInstance, useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { useState } from "react"
import { stripe } from "@/lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Link from "next/link"
import { CaretLeft, CaretRight, ShoppingBag } from "phosphor-react"

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

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "free-snap",
    initial: 0,
    slides: () => products.map((product, index) => {
      let origin
      switch (index) {
        case 0:
          origin = 0.1
          break;
        
        case (products.length - 1):
          origin = 0.4
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

  function handleChangeSlide(direction: "left" | "right") {
    if (direction === "right") {
      instanceRef.current?.next()
    }else{
      instanceRef.current?.prev()
    }
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider" css={{$$child: '2'}}>
        <ArrowButton direction={"left"} disabled={slideIndex === 0} onClick={() => {handleChangeSlide("left")}}>
          <CaretLeft size={48} />
        </ArrowButton>
        {products.map((product, index) => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className={slideIndex === index ? "keen-slider__slide active" : "keen-slider__slide"}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <button>
                    <ShoppingBag size={24} />
                  </button>
                </footer>
              </Product>
            </Link>
          )
        })}
        <ArrowButton direction={"right"} disabled={slideIndex === (products.length - 1)}  onClick={() => {handleChangeSlide("right")}}>
          <CaretRight size={48} />
        </ArrowButton>
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