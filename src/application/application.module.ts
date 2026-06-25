import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './application.schema';
import { Job, JobSchema } from 'src/jobs/schema.jobs';

@Module({
  imports: [MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }]), MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  providers: [ApplicationService],
  controllers: [ApplicationController]
})
export class ApplicationModule {}
