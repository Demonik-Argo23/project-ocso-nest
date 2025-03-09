import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.host,
    port: Number(process.env.port),
    username: 'localhost',
    password: 'TheBestPassword',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
  }),EmployeesModule, ProductsModule, ProvidersModule, ManagersModule, LocationsModule, RegionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}