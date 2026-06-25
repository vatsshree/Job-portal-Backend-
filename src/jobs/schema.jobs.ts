
import{Prop , Schema , SchemaFactory} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/user.schema';

export type Jobdocument = Job & Document;

@Schema()
export class Job {

    @Prop({required:true })
    recruiter_id !: string ;

    @Prop({required:true })
    Company_Name !: string;

    @Prop({required:true })
    job_title !: string;
    
    @Prop({required:true })
    Experience_Req !: string;

    @Prop({required:true})
    Approx_salary_per_month!: string;

    @Prop({required:true })
    Level!: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
