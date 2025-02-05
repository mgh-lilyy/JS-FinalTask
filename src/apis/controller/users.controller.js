import userService from "../service/users.service";

class UsersController {
    async getUsers(req, res, next) {
        try{
            const users = await userService.getUsers();
            return res.status(200).json({
                success: true,
                data: users
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                error: error,
                message: "Error"
            });
        }
    }

    async getDetailUser(req, res, next){
        try{
            const userId = req.params.id;
            const user = await userService.getDetailUser(userId);
            return res.status(200).json({
                success: true,
                data: user
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "IError"
            });
        }
    }

    async createUser(req, res, next){
        try{
            const newUser = {
                name: req.body.name,    
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                age: req.body.age,
                username: req.body.username
            }
            await userService.createUser(newUser);
            return res.status(200).json({
                success: true,
                message: "Created User"
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }

    async updateUser(req, res, next){
        try{
            if(req.user.id == req.params.id)
                {
                    const userId = req.params.id;
                    const newUser = {
                        name: req.body.name,    
                        email: req.body.email,
                        password: req.body.password,
                        gender: req.body.gender,
                        age: req.body.age,
                        username: req.body.username
                    }
                    await userService.updateUser(userId, newUser);
                    return res.status(200).json({
                        success: true,
                        message: "Updated User"
                    });
                }
            else{
                return res.status(500).json({
                    success: false,
                    message: "Acess denied"
                });
                }
        }catch(error){
            console.log("Loi update" + error)
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }

    async deleteUser(req, res, next){
        try{
            if(req.user.id == req.params.id)
                {
                    const userId = req.params.id;
                    await userService.deleteUser(userId);
                    return res.status(200).json({
                        success: true,
                        message: "Deleted User"
                    });
                }
            else{
                    return res.status(500).json({
                        success: false,
                        message: "Acess denied"
                    });
                }
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
    }
    async getOwnInfor(req, res, next)
    {
        try {
            const user = req.user;
            res.send(user)
           
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
    
}

export default new UsersController();