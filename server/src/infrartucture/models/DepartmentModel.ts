import{Schema, model} from 'mongoose';
import { IDepartment } from '../../domain/entities/Department';

const departmentSchema = new Schema<IDepartment>({
  deptName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
},{
  timestamps: true,
});

const DepartmentModel = model<IDepartment>('Department', departmentSchema);
export default DepartmentModel;