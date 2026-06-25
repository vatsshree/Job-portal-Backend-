import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application, Applicationdocument } from './application.schema';
import { Model } from 'mongoose';
import { Job, Jobdocument } from 'src/jobs/schema.jobs';

@Injectable()
export class ApplicationService {
    constructor(@InjectModel(Application.name) private appModel:Model<Applicationdocument>,
                @InjectModel(Job.name) private jobmodel:Model<Jobdocument>){}

    async apply(userId:string , jobId:string, data:Partial<Application>)
    {
        const job = await this.jobmodel.findById(jobId);
        if(!job)
        {
            throw new NotFoundException();
        }

        const applicant= new this.appModel({ userId,jobId,...data});
        return applicant.save();
        
    }

    async getApplicationByUserId(user_ID:string)
    {
        return this.appModel.find({userId:user_ID}).exec();
    }

    async getApplicationByJobId(user_ID:string,job_ID:string)
    {
        const job = await this.jobmodel.findById(job_ID);
        if(!job){
            throw new NotFoundException();
        }
        
        if(job.recruiter_id !== user_ID){
            throw new ForbiddenException('You do not own this job');
        }
        

        return this.appModel.find({jobId:job_ID}).exec();
    }
}
