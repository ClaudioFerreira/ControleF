import { PartialType } from '@nestjs/swagger';
import { CreateRecurringAccountDto } from './create-recurring-account.dto';

export class UpdateRecurringAccountDto extends PartialType(CreateRecurringAccountDto) {}
