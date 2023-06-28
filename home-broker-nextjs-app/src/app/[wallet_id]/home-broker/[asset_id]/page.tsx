import MyOrders from '@/app/components/MyOrders'
import OrderForm from '@/app/components/OrderForm'
import { Card, TabsGroup, TabsItem } from '@/app/components/flowbite-components'
import { OrderType } from '@/app/models'
import { HiArrowUp, HiShoppingCart } from '@/app/components/react-icons/hi'
import { SyncOrders } from '@/app/components/SyncOrders'
import AssetChartComponent from '@/app/components/AssetChartComponent'

interface iHomePageProps {
	params: {
		wallet_id: string;
		asset_id: string;
	}
}

export default async function HomeBrokerPage({ params }: iHomePageProps) {
	return (
		<main className="flex flex-grow flex-col container mx-auto p-2">
			<article className="format format-invert">
				<h1>Home broker - {params.asset_id}</h1>
			</article>
			<div className="grid grid-cols-5 flex-grow gap-2 mt-2">
				<div className="col-span-2">
					<div>
						<Card
							theme={{
								root: {
									children: 'flex h-full flex-col justify-center gap-4 py-4 px-2'
								}
							}}
						>
							<TabsGroup aria-label="Default tabs" style="pills">
								<TabsItem active title="Comprar" icon={HiShoppingCart}>
									<OrderForm
										wallet_id={params.wallet_id}
										asset_id={params.asset_id}
										type={OrderType.BUY}
									/>
								</TabsItem>
								<TabsItem title="Vender" icon={HiArrowUp}>
									<OrderForm
										wallet_id={params.wallet_id}
										asset_id={params.asset_id}
										type={OrderType.SELL}
									/>
								</TabsItem>
							</TabsGroup>
						</Card>
					</div>
					<div className="mt-2">
						<Card
							theme={{
								root: {
									children: 'flex h-full flex-col justify-center gap-4 py-4 px-2',
								},
							}}
						>
							<SyncOrders wallet_id={params.wallet_id}>
								<div className="max-h-96 overflow-y-auto overflow-hidden">
									<MyOrders wallet_id={params.wallet_id} />
								</div>
							</SyncOrders>
						</Card>
					</div>
				</div>
				<div className="col-span-3 flex flex-grow">
					<AssetChartComponent asset_id={params.asset_id}/>
				</div>
			</div>
		</main>
	)
}
