import { PassportStrategy } from "@nestjs/passport";
import{ ExtractJwt , Strategy} from 'passport-jwt';
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStratergy extends PassportStrategy(Strategy){
    constructor(configservice:ConfigService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configservice.get<string>('MY_JWT_SECRET')
        });
    }


    async validate(payload:any){
        return {userId: payload.sub, user_name:payload.user_name, email:payload.email , ph_Number:payload.ph_Number ,Role:payload.Role};
    }

} 