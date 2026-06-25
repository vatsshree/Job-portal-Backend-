import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, Jobdocument } from './schema.jobs';
import { Model } from 'mongoose';

@Injectable()
export class JobsService {
    constructor(@InjectModel(Job.name) private jobmodel:Model<Jobdocument>){}

    async addJob(recruiter_id: string , Company_Name:string, job_title: string, Experience_Req: string , Approx_salary_per_month: string , Level: string)
    {
        const new_job= new this.jobmodel({recruiter_id, Company_Name, job_title, Experience_Req, Approx_salary_per_month, Level});
        return new_job.save();
    }

    async getAllJobs():Promise<Job[]>
    {
        return this.jobmodel.find().exec();
    }

    
    async getJobByID(id:string):Promise<Job|null>
    {
        return this.jobmodel.findById(id).exec();
    }

    async getJobsRecPosted(id:string)
    {
        return this.jobmodel.find({recruiter_id:id}).exec();
    }

    async updateById(id: string , user_id:string, data:Partial<Job>): Promise<Job|null>
    {
        const job = await this.jobmodel.findById(id);
        if(!job){
            throw new NotFoundException();
        }

        if(job.recruiter_id !== user_id){
            throw new ForbiddenException('You do not own this job');
        }

        const updated=await this.jobmodel.findByIdAndUpdate
        (id, {Company_Name:data.Company_Name??null , job_title :data.job_title ??null
             ,Experience_Req:data.Experience_Req??null, Approx_salary_per_month:data.Approx_salary_per_month??null, Level :data.Level??null},
             {overwrite:true,new:true});
        return updated;
    }

    async patchMethod(id: string , user_id:string, data:Partial<Job>): Promise<Job|null>
    {
        const job = await this.jobmodel.findById(id);
        if(!job){
            throw new NotFoundException();
        }

        if(job.recruiter_id !== user_id){
            throw new ForbiddenException('You do not own this job');
        }
        return this.jobmodel.findByIdAndUpdate(id , data,{new:true}).exec(); 
    }
    
    async deleteMethod(id: string ,user_id:string, ): Promise<Job|null>
    {
        const job = await this.jobmodel.findById(id);
        if(!job){
            throw new NotFoundException();
        }

        if(job.recruiter_id !== user_id){
            throw new ForbiddenException('You do not own this job');
        }
        
        return this.jobmodel.findByIdAndDelete(id).exec(); //best practice
    }

}
