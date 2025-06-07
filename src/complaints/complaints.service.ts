import { Injectable } from '@nestjs/common';

@Injectable()
export class ComplaintsService {
    filterComplaints(arg0: { zone: string | undefined; categorie: string | undefined; statut: string | undefined; dateDebut: string | undefined; dateFin: string | undefined; }) {
        throw new Error('Method not implemented.');
    }
}
