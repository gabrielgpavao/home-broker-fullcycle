import { baseUrl } from '@/services/baseUrl'
import { isMarketClosed } from '@/utils/revalidateCondition'
import { NextRequest, NextResponse } from 'next/server'

interface iGETProps {
	params: {
		wallet_id: string
	}
}

export async function GET(_: NextRequest, { params }: iGETProps) {
	const response = await fetch(baseUrl + `/wallets/${params.wallet_id}/assets`, {
		next: {
			revalidate: isMarketClosed() ? 60 * 60 : 5
		}
	})
	return NextResponse.json(await response.json())
}