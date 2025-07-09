import { Request , Response , NextFunction } from "express";


interface AuthenticateRequest extends Request
{
    user? : {userId : string , role : "patient"|"doctor"|"admin" }
}


// now accepts the array of roles 

export const checkRoles = (allowedRoles : string[])=> // it takes a string of array like admin patient etc
{
    return (req : AuthenticateRequest , res : Response , next : NextFunction) =>
    {
        const userRole = req.user?.role

        if(!userRole || !allowedRoles.includes(userRole)) // if user role not included in the allowed roles
        {
            res.status(403).json({message : "access denied . Role not autherized"})

        }

        next() // user is allowed so continue
    }

}