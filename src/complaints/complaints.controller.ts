import { Controller, Get, Patch, Param, Query } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Get('filter')
  filterComplaints(
    @Query('zone') zone?: string,
    @Query('categorie') categorie?: string,
    @Query('statut') statut?: string,
    @Query('dateDebut') dateDebut?: string,
    @Query('dateFin') dateFin?: string,
  ) {
    return this.complaintsService.filterComplaints({
      zone,
      categorie,
      statut,
      dateDebut,
      dateFin,
    });
  }

  @Get('export')
  exportComplaints() {
    return this.complaintsService.exportComplaints();
  }

  @Patch(':id/disable')
  disableComplaint(@Param('id') id: string) {
    return this.complaintsService.disableComplaint(id);
  }

  @Patch(':id/enable')
  enableComplaint(@Param('id') id: string) {
    return this.complaintsService.enableComplaint(id);
  }
}
