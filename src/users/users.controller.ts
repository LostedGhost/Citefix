import { Controller, Get, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from './roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.findById(req.user.userId);
  }

  @Patch('me')
  updateProfile(@Request() req, @Body() dto: UpdateUserDto) {
    return this.usersService.update(req.user.userId, dto);
  }

  @Delete('me')
  deactivateSelf(@Request() req) {
    return this.usersService.deactivate(req.user.userId);
  }

  // ADMIN SYSADMIN

  @UseGuards(RolesGuard)
  @Roles(Role.SYSADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.SYSADMIN)
  @Patch(':id/deactivate')
  deactivateUser(@Param('id') id: string) {
    return this.usersService.deactivate(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.SYSADMIN)
  @Patch(':id/activate')
  activateUser(@Param('id') id: string) {
    return this.usersService.activate(id);
  }
}
