'use client'

import { PropsWithChildren, startTransition } from 'react'
import useSWRSubscription, { SWRSubscriptionOptions } from 'swr/subscription'
import { revalidateOrders } from '../actions/revalidate-orders'

export function SyncOrders({ children, wallet_id }: PropsWithChildren<{ wallet_id: string }>) {
	const { data, error } = useSWRSubscription(
		`http://localhost:3000/wallets/${wallet_id}/orders/events`,
		(path, { next }: SWRSubscriptionOptions) => {
			const eventSource = new EventSource(path)

			eventSource.addEventListener('order-created', async (event) => {
				const orderCreated = JSON.parse(event.data)

				next(null, orderCreated)

				startTransition(() => {
					revalidateOrders(wallet_id)
				})
			})
			eventSource.addEventListener('order-updated', async (event) => {
				const orderUpdated = JSON.parse(event.data)

				next(null, orderUpdated)

				startTransition(() => {
					revalidateOrders(wallet_id)
				})
			})

			eventSource.onerror = (event) => {
				eventSource.close()
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				next(event.data, null)
			}
			return () => {
				eventSource.close()
			}
		}
	)

	return <>{children}</>
}