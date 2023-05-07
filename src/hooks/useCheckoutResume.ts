import { CartContext } from "@/contexts/CartContext"
import { useMemo } from "react"
import { useContextSelector } from "use-context-selector"


export function useCheckoutResume() {
  const cart = useContextSelector(CartContext, (context) => {
    return context.cart
  })

  const checkoutResume = useMemo(() => {
    return cart.reduce(
      (acc, cartItem) => {
        acc.quantity += cartItem.quantity
        acc.total += cartItem.price
        return acc
      },
      {
        quantity: 0,
        total: 0,
      }
    )
  }, [cart])

  return checkoutResume
}