import { PartialType } from '@nestjs/mapped-types';
import { CreateProviderDto } from '../dto/create-provider.dto';

export class Provider {
    providerId: string;
    providerName: string;
    providerAddress: string;
    providerPhone: string;
    providerEmail: string;
    providerStatus: string;
    products: any;
}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
