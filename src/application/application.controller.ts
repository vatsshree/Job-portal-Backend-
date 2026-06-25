import { Body, Controller, ForbiddenException, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AuthGuard } from '@nestjs/passport';
import { Application } from './application.schema';

@Controller('application')
export class ApplicationController {
    constructor(private readonly appSer:ApplicationService){}

    @Post('apply/:job_ID')
    @UseGuards(AuthGuard('jwt'))
    add_application(@Request() req ,@Param('job_ID') job_ID:string, @Body() data:Partial<Application>)
    {
        const check_role= req.user.Role;
        if(check_role !== "seeker")
        {
            throw new ForbiddenException();
        }
        
        const user_ID:string=req.user.userId;
        
        return this.appSer.apply(user_ID, job_ID, data);
    }

    @Get('my-applications')
    @UseGuards(AuthGuard('jwt'))
    getApplicationUserId(@Request() req)
    {
        const check_role= req.user.Role;
        if(check_role !== "seeker")
        {
            throw new ForbiddenException();
        }
        
        const user_ID= req.user.userId;
        return this.appSer.getApplicationByUserId(user_ID);

    }

    @Get('my-job-applications/:job_ID')
    @UseGuards(AuthGuard('jwt'))
    getApplicationJobId(@Request() req, @Param('job_ID') job_ID:string)
    {
        const check_role= req.user.Role;
        if(check_role !== "recruiter")
        {
            throw new ForbiddenException();
        }
        
        const user_ID= req.user.userId;
        return this.appSer.getApplicationByJobId(user_ID,job_ID);

    }



    
        
    }

