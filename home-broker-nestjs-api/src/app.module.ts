import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { AssetsModule } from './assets/assets.module'
import { WalletsModule } from './wallets/wallets.module'
import { OrdersModule } from './orders/orders.module'

@Module({
	imports: [PrismaModule, AssetsModule, WalletsModule, OrdersModule]
})
export class AppModule {}
