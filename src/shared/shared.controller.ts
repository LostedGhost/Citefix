import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SharedService } from './shared.service';
import { AllocateBudgetDto } from './dto/allocate-budget.dto';

@Controller('shared')
export class SharedController {
  constructor(private readonly sharedService: SharedService) {}

  @Post('allocate-budget')
  @HttpCode(HttpStatus.OK)
  async allocateBudget(@Body() dto: AllocateBudgetDto) {
    const { matched, modified } = await this.sharedService.allocateBudget(dto);
    return {
      message: `Budget de ${dto.budget} alloué pour ${matched} plainte(s) en zone « ${dto.zone} ».`,
      updatedCount: modified,
    };
  }
}

