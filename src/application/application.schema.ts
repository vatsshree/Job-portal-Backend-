import{Prop , Schema , SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Applicationdocument =  Application & Document;

@Schema()
export class Application{

    @Prop({required:true })
    userId!: string;

    @Prop({required:true })
    jobId!: string;
    
    @Prop({required:true })
    name!: string;

    @Prop({required:true})
    current_level !: string;

    @Prop({required:true})
    experience !: string;

}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
