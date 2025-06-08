import { Controller, Get, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('voirtouscompte')
  getAllUsersExceptSelf(@Req() request: Request) {
    const user = request.user as { id: string } | undefined;
    const userId = user?.id;
    if (!userId) {
      throw new Error('User ID is missing from request.');
    }
    return this.adminService.findAllUsersExceptSelf(userId);
  }
}
