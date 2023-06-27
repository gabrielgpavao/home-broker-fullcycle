import { baseUrl } from '@/services/baseUrl'
import { WalletAsset } from '../models'
import { isHomeBrokerClosed } from '@/utils/revalidateCondition'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from './flowbite-components'
import Link from 'next/link'

interface iHomePageProps {
	wallet_id: string
}

async function getWalletAssets(wallet_id: string): Promise<WalletAsset[]> {
	const response = await fetch(baseUrl + `/wallets/${wallet_id}/assets`, {
		next: {
			revalidate: isHomeBrokerClosed() ? 60 * 60 : 5
		}
	})
	return response.json()
}

export default async function MyWallet({ wallet_id }: iHomePageProps) {
	const walletAssets = await getWalletAssets(wallet_id)
	
	return (
		<Table>
			<TableHead>
				<TableHeadCell>Nome</TableHeadCell>
				<TableHeadCell>Preço R$</TableHeadCell>
				<TableHeadCell>Quant.</TableHeadCell>
				<TableHeadCell>
					<span className="sr-only">Comprar/Vender</span>
				</TableHeadCell>
			</TableHead>
			<TableBody className="divide-y">
				{walletAssets.map((walletAsset, key) => (
					<TableRow className="border-gray-700 bg-gray-800" key={key}>
						<TableCell className="whitespace-nowrap font-medium text-white">
							{walletAsset.Asset.id} ({walletAsset.Asset.symbol})
						</TableCell>
						<TableCell>{walletAsset.Asset.price}</TableCell>
						<TableCell>{walletAsset.shares}</TableCell>
						<TableCell>
							<Link
								className="font-medium hover:underline text-cyan-500"
								href={`/${wallet_id}/home-broker/${walletAsset.Asset.id}`}
							>
								Comprar/Vender
							</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
