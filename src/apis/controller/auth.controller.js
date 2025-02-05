import authService from '../service/auth.service'
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import userModel from '../../model/user.model';
import userIdentityService from '../service/authentication.service'

class AuthController{
    async login(req, res, next)
    { 
        try{
            const {username, password} = req.body;
            const user = await authService.login(username, password);
            console.log(user)
            const accessToken = await userIdentityService.sign(user);
            if(!user)
                {
                    return res.status(401).json({
                        success: false, 
                        message: "Invalid username or password"
                    })
                }
            return res.status(401).json({
                success: true, 
                token: accessToken
            })
        }catch(error){
                console.log(error)
                return res.status(500).json({
                    success: false,
                    message: "Error"
                });
        }
    }

    async register(req, res, next)
    {
        try {
            console.log("vao register")
            const { email, username, password} = req.body;
            if(!await authService.register({ email, username, password})) 
                {
                    return res.status(409).json({
                        success: false, 
                        message: "username or email already exist"
                    });
                }
            return res.status(201).json({
                success: true, 
                message: "Created User"
            });
        } catch (error) {
            console.log("Controller Error" + error)
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"    
            });
        }
    }

    async forgotPassword(req, res, next)
    {
        try {
            const user = req.body;
            if(!await authService.forgotPassword(user.email))
                return res.status(401).json({
                    success: false,
                    message: "User not found"    
            })
            return res.status(201).json({
                success: true, 
                message: "Sent mail"
            });
        } catch (error) {
            console.log("Controller Error" + error)
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"    
            });
        }

    }

    async resetPassword(req, res, next)
    {
        try {
            const {tokenReset, newPassword} = req.body;
            if(!await authService.resetPassword(tokenReset, newPassword))
            {
                return res.status(400).json({
                    success: false,
                    message: "Token expired or user not found, request again"  
                });
            }
            return res.status(201).json({
                success: true, 
                message: "Reset successfully"
            });

        } catch (error) {
            console.log("Control Error" + error)
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"    
            });
        }
    }
}

export default new AuthController();

