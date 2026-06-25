import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, Userdocument } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name)
                private userModel:Model<Userdocument>,
                private jwtServ:JwtService){}


    async signup(user_name:string ,email: string, ph_Number:string, Role:string ,password: string){
        const hash = await bcrypt.hash(password, 10);
        const user = new this.userModel({user_name,email,ph_Number,Role,password: hash });
        return user.save();
    }

    async login(user_name: string, password: string){
    const user = await this.userModel.findOne({ user_name });
    if(!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return null;
    const payload = {user_name: user.user_name, email: user.email, ph_Number: user.ph_Number, Role: user.Role, sub: user._id };
    return {
        access_token: this.jwtServ.sign(payload),
        }
    }

    async patchMethod(id: string , current_password: string, data:Partial<User>)
    {
        const user = await this.userModel.findById(id);
        if(!user) return null;
        const isMatch = await bcrypt.compare( current_password, user.password);
        if(!isMatch) return null;

        if(data.password)
        {
            data.password= await bcrypt.hash(data.password, 10);
        }
        
        delete data.Role;
        return this.userModel.findByIdAndUpdate(id, data,{new:true}).exec(); 
    }
    
    async deleteMethod(id: string )
    {
        
        return this.userModel.findByIdAndDelete(id).exec(); 
    
    }
    
    
}
