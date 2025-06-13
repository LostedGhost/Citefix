import { IsEnum } from 'class-validator';
import { ComplaintStatut } from '../complaint-statut.enum';

export class UpdateComplaintStatutDto {
  @IsEnum(ComplaintStatut)
  statut: ComplaintStatut;
}
