import { PartialType } from '@nestjs/mapped-types';
import { CreateVendedoreDto } from './create-vendedore.dto';

export class UpdateVendedoreDto extends PartialType(CreateVendedoreDto) {}
