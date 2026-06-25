import{Prop , Schema , SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Userdocument = User & Document;

@Schema()
export class User {
    @Prop({required:true ,unique:true })
    user_name!: string;
    
    @Prop({required:true , unique:true})
    email !: string;

    @Prop({required:true , unique:true})
    ph_Number !: string;

    @Prop({required:true})
    Role !: string;
    
    @Prop({required:true})
    password !: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
