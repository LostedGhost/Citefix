import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class ComplaintsService {
  private complaintsCollection;

  constructor(@Inject('MONGO_CONNECTION') private readonly db: Db) {
    this.complaintsCollection = this.db.collection('complaints');
  }

  async filterComplaints(filters: any) {
    const query: any = {};
    if (filters.zone) query.zone = filters.zone;
    if (filters.categorie) query.categorie = filters.categorie;
    if (filters.statut) query.status = filters.statut;
    if (filters.dateDebut || filters.dateFin) {
      query.date = {};
      if (filters.dateDebut) query.date.$gte = new Date(filters.dateDebut);
      if (filters.dateFin) query.date.$lte = new Date(filters.dateFin);
    }

    return this.complaintsCollection.find(query).toArray();
  }

  async exportComplaints() {
    return this.complaintsCollection.find({}).toArray();
  }

  async disableComplaint(id: string) {
    const result = await this.complaintsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: 'suspendue' } }
    );
    if (result.matchedCount === 0) {
      throw new NotFoundException('Plainte non trouvée');
    }
    return { message: 'Plainte suspendue avec succès' };
  }

  async enableComplaint(id: string) {
    const result = await this.complaintsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: 'active' } }
    );
    if (result.matchedCount === 0) {
      throw new NotFoundException('Plainte non trouvée');
    }
    return { message: 'Plainte réactivée avec succès' };
  }
}
