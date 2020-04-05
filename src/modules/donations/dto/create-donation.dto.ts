import { DonationItemDto } from './donation-item.dto';

export class CreateDonationDto {
  readonly title: string;
  readonly observations: string;
  readonly priority: number;
  readonly state: string;
  readonly healthCenter_id: string;
  readonly items: DonationItemDto[];
}
