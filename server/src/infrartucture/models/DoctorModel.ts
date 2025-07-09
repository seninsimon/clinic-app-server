import { Schema, model } from 'mongoose';
import { IDoctor } from '../../domain/entities/Doctor';


const DoctorSchema: Schema<IDoctor> = new Schema(
  {
    
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    specialisation: {  
        type: Schema.Types.ObjectId, 
        ref: 'Department'
    },
    experience: { type: Number, required: true },
    fee: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Approved', 'Rejected', 'Pending'],
      default : "Pending"
    },
    isBlocked: { type: Boolean, default: false },
    additionalInfo: { type: String },
    profilePicture: { type: String },
    medicalLicence: { type: String },
    role: { type: String  , default : "doctor"},
  },
  {
    timestamps: true, 
  }
);


export const DoctorModel = model<IDoctor>('Doctor', DoctorSchema);