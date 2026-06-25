import { Body, Controller, Post, UseGuards , Request, ForbiddenException, Get, Param, Put, Patch, Delete} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { AuthGuard } from '@nestjs/passport';
import { Job } from './schema.jobs';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobService:JobsService){}

    @Post('create-job')
    @UseGuards(AuthGuard('jwt'))
    add_job(@Request() req , @Body() body:{Company_Name:string, job_title: string, Experience_Req: string , Approx_salary_per_month: string , Level: string})
    {
        const check_role= req.user.Role;
        if(check_role !== "recruiter")
        {
            throw new ForbiddenException();
        }

        const rec_id:string=req.user.userId;

        return this.jobService.addJob(rec_id, body.Company_Name, body.job_title, body.Experience_Req, body.Approx_salary_per_month, body.Level);
    }

    @Get('all-jobs')
    async get_All()
    {
        return this.jobService.getAllJobs();
    }

    @Get('job/:job_id')
    async get_By_Id(@Param('job_id') job_id:string)
    {
        return this.jobService.getJobByID(job_id);
    }

    @Get("recruiter/:id")
    async get_By_recId(@Param('id') id:string)
    {
        return this.jobService.getJobsRecPosted(id);
    }

    @Put('fully-update-job/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateJob(@Request() req,@Param('id') id:string ,@Body() data:Partial<Job>,)
    {
        const check_role= req.user.Role;
        if(check_role !== "recruiter")
        {
            throw new ForbiddenException();
        }
        return this.jobService.updateById(id , req.user.userId, data,);
    }
    
    @Patch('update-job/:id')
    @UseGuards(AuthGuard('jwt'))
    async patchJob(@Request() req,@Param('id') id:string , @Body() data:Partial<Job>,)
    {
        const check_role= req.user.Role;
        if(check_role !== "recruiter")
        {
            throw new ForbiddenException();
        }
        return this.jobService.patchMethod(id ,req.user.userId, data,);
    }

    @Delete('delete-job/:id')
    @UseGuards(AuthGuard('jwt'))
    async delJob(@Request() req,@Param('id') id:string ,)
    {
        const check_role= req.user.Role;
        if(check_role !== "recruiter")
        {
            throw new ForbiddenException();
        }
        return this.jobService.deleteMethod(id, req.user.userId);
    }

    
}
