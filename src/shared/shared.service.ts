import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Complaint, ComplaintDocument } from '../complaints/schemas/complaint.schema';
import { AllocateBudgetDto } from './dto/allocate-budget.dto';

@Injectable()
export class SharedService {
  constructor(
    @InjectModel(Complaint.name) 
    private complaintModel: Model<ComplaintDocument>,
  ) {}

  /**
   * Alloue un budget de récompense à toutes les plaintes d'une zone donnée.
   * @returns matchedCount & modifiedCount pour informations.
   */
  async allocateBudget(dto: AllocateBudgetDto): Promise<{ matched: number; modified: number }> {
    const result = await this.complaintModel.updateMany(
      { zone: dto.zone },
      { $set: { rewardBudget: dto.budget } },
    ).exec();

    if (result.matchedCount === 0) {
      throw new NotFoundException(`Aucune plainte trouvée pour la zone « ${dto.zone} »`);
    }

    return {
      matched: result.matchedCount,
      modified: result.modifiedCount,
    };
  }
}
