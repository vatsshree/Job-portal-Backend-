import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './schema.jobs';

@Module({
  imports: [
  MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule {}
