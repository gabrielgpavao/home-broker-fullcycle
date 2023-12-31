import { Order } from '@/app/models'
import { baseUrl } from '../../services/baseUrl'
import { isMarketClosed } from '@/utils/revalidateCondition'
import { Badge, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from './flowbite-components'

interface iMyOrdersProps {
	wallet_id: string
}

async function getOrders(wallet_id: string): Promise<Order[]> {
	const response = await fetch(baseUrl + `/wallets/${wallet_id}/orders`,	{
		next: {
			tags: [`orders-wallet-${wallet_id}`],
			revalidate: isMarketClosed() ? 60 * 60 : 5
		}
	})

	return await response.json()
}

export default async function MyOrders ({ wallet_id }: iMyOrdersProps) {
	const orders = await getOrders(wallet_id)
	
	return (
		<div>
			<article className="format format-invert">
				<h2>Minha ordens</h2>
			</article>
			<Table className="mt-2">
				<TableHead>
					<TableHeadCell>asset_id</TableHeadCell>
					<TableHeadCell>quant.</TableHeadCell>
					<TableHeadCell>price</TableHeadCell>
					<TableHeadCell>tipo</TableHeadCell>
					<TableHeadCell>status</TableHeadCell>
				</TableHead>
				<TableBody>
					{orders.map((order, key) => (
						<TableRow
							className=" border-gray-700 bg-gray-800"
							key={key}
						>
							<TableCell className="whitespace-nowrap font-medium text-white">
								{order.Asset.id}
							</TableCell>
							<TableCell>{order.shares}</TableCell>
							<TableCell>{order.price}</TableCell>
							<TableCell>
								<Badge>{order.type}</Badge>
							</TableCell>
							<TableCell>
								<Badge>{order.status}</Badge>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
