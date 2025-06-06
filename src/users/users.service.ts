import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(data: any) {
    const existing = await this.userModel.findOne({ email: data.email });
    if (existing) {
        throw new BadRequestException('Cet email est déjà utilisé.');
    }
    const user = new this.userModel(data);
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).select('-password').exec();
  }

  async update(userId: string, updateData: Partial<any>) {
    return this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-password').exec();
  }

  async deactivate(userId: string) {
    return this.userModel.findByIdAndUpdate(userId, { isActive: false }, { new: true }).exec();
  }

  async activate(userId: string) {
    return this.userModel.findByIdAndUpdate(userId, { isActive: true }, { new: true }).exec();
  }

  async findAll() {
    return this.userModel.find().select('-password').exec();
  }

}
