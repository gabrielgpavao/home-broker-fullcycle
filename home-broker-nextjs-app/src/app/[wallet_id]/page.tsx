import MyWallet from '@/app/components/MyWallet'

interface iHomePageProps {
	params: {
		wallet_id: string
	}
}

export default async function HomePage({ params }: iHomePageProps) {
	return (
		<main className='container mx-auto px-2'>
			<article className='format format-invert'>
				<h1>Meus Investimentos</h1>
			</article>
			<MyWallet wallet_id={params.wallet_id}/>
		</main>
	)
}
