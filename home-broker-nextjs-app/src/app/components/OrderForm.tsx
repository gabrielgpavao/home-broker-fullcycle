import { revalidateTag } from 'next/cache'
import { baseUrl } from '../../services/baseUrl'
import { OrderStatus, OrderType } from '../models'
import { Button, Label, TextInput } from './flowbite-components'

async function initTransaction(formData: FormData) {
	'use server'

	const wallet_id = formData.get('wallet_id')
	const asset_id = formData.get('asset_id')
	const type = formData.get('type')
	const shares = formData.get('shares')
	const price = formData.get('price')

	await fetch(baseUrl + `/wallets/${wallet_id}/orders`, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			shares,
			price,
			asset_id,
			type,
			status: OrderStatus.OPEN,
			Asset: {
				id: asset_id,
				symbol: 'PETR4',
				price: 30,
			},
		}),
	})

	revalidateTag(`orders-wallet-${wallet_id}`)
}

interface iOrderFromProps {
	wallet_id: string;
	asset_id: string;
	type: OrderType;
}

export default function OrderForm({ wallet_id, asset_id, type }: iOrderFromProps) {
	return (
		<div>
			<h1>Order Form</h1>
			<form action={initTransaction}>
				<input name='asset_id' type='hidden' defaultValue={asset_id} />
				<input name='wallet_id' type='hidden' defaultValue={wallet_id} />
				<input name='type' type='hidden' defaultValue={OrderType.BUY} />
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='shares' value='Quantidade' />
					</div>
					<TextInput
						id='shares'
						name='shares'
						required
						type='number'
						min={1}
						step={1}
						defaultValue={1}
					/>
				</div>
				<br />
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='shares' value='Preço R$' />
					</div>
					<TextInput
						id='price'
						name='price'
						required
						type='number'
						min={1}
						step={1}
						defaultValue={1}
					/>
				</div>
				<br />
				<Button type='submit' color={type === OrderType.BUY ? 'green' : 'red'}>
					Confirmar {type === OrderType.BUY ? 'compra' : 'venda'}
				</Button>
			</form>
		</div>
	)
}
