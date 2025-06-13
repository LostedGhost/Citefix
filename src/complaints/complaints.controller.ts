import {
  Body,
  Controller,
  Param,
  Patch,
  Get,
  UseGuards,
  Request,
  Res,
  Header,
} from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintStatut } from './complaint-statut.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/guards/roles/roles.decorator';
import { Role } from 'src/users/roles.enum';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('complaints')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Roles(Role.TECHNICIEN)
  @Patch(':id/start-intervention')
  startInterventionOnComplaint(@Param('id') id: string) {
    return this.complaintsService.updateComplaintStatus(
      id,
      ComplaintStatut.EN_INTERVENTION,
    );
  }

  @Roles(Role.TECHNICIEN)
  @Patch(':id/end-intervention')
  endInterventionOnComplaint(@Param('id') id: string) {
    return this.complaintsService.updateComplaintStatus(
      id,
      ComplaintStatut.FIN_INTERVENTION,
    );
  }

  @Roles(Role.AUTORITE)
  @Patch(':id/validate')
  validateComplaint(@Param('id') id: string) {
    return this.complaintsService.updateComplaintStatus(
      id,
      ComplaintStatut.VALIDEE,
    );
  }
  @Roles(Role.AUTORITE)
  @Patch(':id/reject')
  rejectComplaint(@Param('id') id: string) {
    return this.complaintsService.updateComplaintStatus(
      id,
      ComplaintStatut.REJETEE,
    );
  }

  @Roles(Role.AUTORITE)
  @Patch(':id/confirm-resolved')
  confirmResolvedComplaint(@Param('id') id: string) {
    return this.complaintsService.updateComplaintStatus(
      id,
      ComplaintStatut.REGLEE,
    );
  }

  @Roles(Role.TECHNICIEN)
  @Get('assigned-to-me')
  @UseGuards(JwtAuthGuard)
  getComplaintAssignedToMe(@Request() req) {
    const techId: string = req.user._id;
    return this.complaintsService.allComplaintAssignedToTech(techId);
  }

  @Roles(Role.AUTORITE)
  @Patch(':id/assign')
  assignComplaintToTechnician(
    @Param('id') id: string,
    @Body('technicienId') technicienId: string,
  ) {
    return this.complaintsService.assignComplaintToTechnician(id, technicienId);
  }

  @Roles(Role.AUTORITE)
  @Get('unassigned')
  getUnassignedComplaints() {
    return this.complaintsService.getUnassignedComplaints();
  }

  @Get('export')
  @Header('Content-Disposition', 'attachment; filename="plaintes.csv"')
  async exportToCsv() {
    const csv = await this.complaintsService.exportPlaintes();
    return csv;
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
