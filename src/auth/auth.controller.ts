import { Body, Controller, Delete, Get, Param, Patch, Post , Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.schema';

@Controller('auth')
export class AuthController {
    constructor(private auth:AuthService){}

    @Post('signUp')
    signup(@Body() body:{user_name:string ,email: string, ph_Number:string, Role:string ,password: string})
    {
        return this.auth.signup(body.user_name, body.email, body.ph_Number, body.Role, body.password);
    }

    @Post('login')
    login(@Body() body:{user_name:string ,password: string})
    {
        return this.auth.login(body.user_name, body.password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }

    @Patch('update-profile')
    @UseGuards(AuthGuard('jwt'))
    async patchJob(@Request() req, @Body('current_password')  current_password:string, @Body() data:Partial<User>,)
    {
        return this.auth.patchMethod(req.user.userId, current_password, data,);
    }

    @Delete('delete-profile')
    @UseGuards(AuthGuard('jwt'))
    async delJob(@Request() req)
    {
        return this.auth.deleteMethod(req.user.userId);
    }    
    
    
    }

