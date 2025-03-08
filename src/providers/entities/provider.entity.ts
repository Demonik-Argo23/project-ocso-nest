import { PartialType } from '@nestjs/mapped-types';
import { CreateProviderDto } from '../dto/create-provider.dto';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
