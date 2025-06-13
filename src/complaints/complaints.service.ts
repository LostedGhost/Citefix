import { Injectable, NotFoundException } from '@nestjs/common';
import { Complaint } from './schema/complaint.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComplaintStatut } from './complaint-statut.enum';
import { Parser } from 'json2csv';
@Injectable()
export class ComplaintsService {
  constructor(
    @InjectModel(Complaint.name)
    private complaintModel: Model<Complaint>,
  ) {}
  /**
   * Met à jour le statut d'une plainte.
   * @param id L'identifiant de la plainte.
   * @param newStatut Le nouveau statut de la plainte.
   * @returns La plainte mise à jour.
   * @throws NotFoundException si la plainte n'est pas trouvée.
   */
  async updateComplaintStatus(
    id: string,
    newStatut: ComplaintStatut,
  ): Promise<Complaint> {
    const complaint = await this.complaintModel
      .findByIdAndUpdate(id, { statut: newStatut }, { new: true })
      .exec();
    if (!complaint) {
      throw new NotFoundException('Painte non trouvée');
    }
    return complaint;
  }

  //TODO: ordonner les plaintes par statut et date de publication
  async allComplaintAssignedToTech(
    technicienId: string,
  ): Promise<Complaint[] | null> {
    const complaints = await this.complaintModel
      .find({
        technicien_id: technicienId,
      })
      .exec();
    if (!complaints || complaints.length === 0) {
      throw new NotFoundException('Aucune plainte assignée à cet utilisateur');
    }
    return complaints;
  }

  async assignComplaintToTechnician(
    complaintId: string,
    technicienId: string,
  ): Promise<Complaint> {
    const complaint = await this.complaintModel
      .findByIdAndUpdate(
        complaintId,
        { technicien_id: technicienId },
        { new: true },
      )
      .exec();
    if (!complaint) {
      throw new NotFoundException('Plainte non trouvée');
    }
    return complaint;
  }

  async getUnassignedComplaints(): Promise<Complaint[]> {
    const complaints = await this.complaintModel
      .find({
        technicien_id: { $exists: false },
        statut: { $in: [ComplaintStatut.SIGNALEE, ComplaintStatut.VALIDEE] },
      })
      .exec();
    if (!complaints || complaints.length === 0) {
      throw new NotFoundException('Aucune plainte non assignée trouvée');
    }
    return complaints;
  }

  async exportPlaintes(): Promise<string> {
    const complaints = await this.complaintModel.find().lean();

    // Choisir les champs à exporter
    const fields = [
      '_id',
      'description',
      'statut',
      'zone',
      'date_publication',
      'fonds_recu',
      'citoyen_id',
    ];
    const opts = { fields };

    const parser = new Parser(opts);
    const csv = parser.parse(complaints);

    return csv;
  }

  async disableComplaint(id: string): Promise<Complaint> {
    const complaint = await this.complaintModel
      .findByIdAndUpdate(id, { is_active: false }, { new: true })
      .exec();
    if (!complaint) {
      throw new NotFoundException('Plainte non trouvée');
    }
    return complaint;
  }

  async enableComplaint(id: string): Promise<Complaint> {
    const complaint = await this.complaintModel
      .findByIdAndUpdate(id, { is_active: true }, { new: true })
      .exec();
    if (!complaint) {
      throw new NotFoundException('Plainte non trouvée');
    }
    return complaint;
  }
}
