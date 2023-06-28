import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { AssetsModule } from './assets/assets.module'
import { WalletsModule } from './wallets/wallets.module'
import { OrdersModule } from './orders/orders.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { SimulateAssetsPriceCommand } from './simulate-assets-price.command'

@Module({
	imports: [
		ConfigModule.forRoot(),
		PrismaModule,
		AssetsModule,
		WalletsModule,
		OrdersModule,
		MongooseModule.forRoot(process.env.DATABASE_URL)
	],
	providers: [SimulateAssetsPriceCommand]
})
export class AppModule {}
