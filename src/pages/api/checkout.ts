import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { lineItems } = req.body

    if (req.method != "POST") {
        return res.status(405).json({ error: 'Method not allowed.'})
    }

    if (!lineItems) {
        return res.status(400).json({ error: 'Price not found.'})
    }

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}/`

    const checkouSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items: lineItems
    })

    return res.status(201).json({
        checkoutUrl: checkouSession.url
    })
}