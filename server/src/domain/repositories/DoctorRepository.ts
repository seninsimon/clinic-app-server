import { IDoctor } from "../entities/Doctor";



export interface DocotorRepository{

    createDoctor(doctor : Partial<IDoctor>) : Promise <IDoctor>
    findByEmail(email : string) : Promise<IDoctor| null>
    findAllDoctors(): Promise<Partial<IDoctor>[]>;
    findById(id : string) : Promise<IDoctor | null>
    updateDoctorStatus(id: string, status: "Approved" | "Rejected"): Promise<void>;
    doctorDetails() : Promise<Partial<IDoctor>[]>
    updateBlockStatus(doctorId: string, isBlocked: boolean): Promise<boolean>;

}