import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
            MongooseModule.forRoot(process.env.MONGODB_KEY!),
            AuthModule,
            JobsModule,
            ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
