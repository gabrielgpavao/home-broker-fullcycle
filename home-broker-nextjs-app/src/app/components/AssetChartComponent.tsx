'use client'

import { fetcher } from '@/utils/fetcher'
import { ChartComponent, ChartComponentRef } from './ChartComponent'
import useSWR from 'swr'
import useSWRSubscription, { SWRSubscriptionOptions } from 'swr/subscription'
import { AssetDaily } from '../models'
import { MutableRefObject, useRef } from 'react'

interface iAssetChartComponentProps {
	asset_id: string
}

export default function AssetChartComponent({ asset_id }: iAssetChartComponentProps) {
	const chartRef = useRef() as MutableRefObject<ChartComponentRef>
	
	//implementar na api do nextjs para trabalhar com cache após as 18h
	const { data: asset, mutate } = useSWR(
		`http://localhost:3000/assets/${asset_id}`,
		fetcher,
		{
			fallbackData: { id: asset_id, price: 0 },
		}
	)

	const { data: assetDaily } = useSWRSubscription(
		`http://localhost:3000/assets/${asset_id}/daily/events`,
		(path, { next }: SWRSubscriptionOptions) => {
			const eventSource = new EventSource(path)

			eventSource.addEventListener('asset-daily-created', async (event) => {
				const assetDailyCreated: AssetDaily = JSON.parse(event.data)

				chartRef.current.update({
					time: new Date(assetDailyCreated.date).getTime(),
					value: assetDailyCreated.price,
				})

				await mutate(
					{ id: assetDailyCreated.id, price: assetDailyCreated.price },
					false
				)

				next(null, assetDailyCreated)
			})

			eventSource.onerror = (event) => {
				console.error(event)
				eventSource.close()
			}

			return () => {
				eventSource.close()
			}
		},
		{}
	)
	
	return <ChartComponent header={`${asset_id} - R$ ${asset.price}`} ref={chartRef}/>
}
