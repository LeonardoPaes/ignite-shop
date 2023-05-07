import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from 'use-context-selector'

interface CartItem {
  id: string
  name: string
  imageUrl: string
  price: number
  quantity: number
  defaultPriceId: string
}

interface CartContextType {
  cart: CartItem[],
  addToCart: (cartItemAdd: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({children}: CartContextProviderProps){
  const [cart, setCart] = useState([] as CartItem[])

  useEffect(() => {
    const storedStateAsJSON = localStorage.getItem('@ignite-shop:cart-state-1.0.0')

    if (storedStateAsJSON) {
      setCart(JSON.parse(storedStateAsJSON))
    }
  }, [])

  useEffect(() => {
    const stateJSON = JSON.stringify(cart)

    localStorage.setItem('@ignite-shop:cart-state-1.0.0', stateJSON)
  }, [cart])

  const addToCart = useCallback((cartItemAdd: CartItem) => {
    // const cartIndex = cart.findIndex((item) => item.id === cartItemAdd.id)
    // if (cartIndex !== -1) {
    //   setCart((state) =>
    //     state.map((cartItem) => {
    //       if (cartItem.id === cartItemAdd.id) {
    //         return { ...cartItem, quantity: cartItemAdd.quantity + 1 }
    //       }
    //       return cartItem
    //     }),
    //   )
    // } else {
    //   setCart((state) => [...state, cartItemAdd])
    // }
    setCart((state) => {
      const cartIndex = state.findIndex((item) => item.id === cartItemAdd.id)
      if (cartIndex === -1){
        return [...state, cartItemAdd]
      } else {
        return state
      }
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart((state) => state.filter((cartItem) => cartItem.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}