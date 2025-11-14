import { clerkClient } from "@clerk/express";

// Middleware to check userId and hasPremiumPlan

//1. Find user (who is logged in).

//2. Check if they are premium.

//3. If not premium, see if they still have some free usage left.

//4. If yes → let them use that free quota.

//5. If no → set free usage to 0.

//6. Save their plan type (premium or free) inside the request.

//7. If error happens → send error message as response.

export const auth=async(req,res,next)=>{
    try{
        // req.auth() is provided by Clerk (an authentication service).
        const {userId,has}=await req.auth();
        const hasPremiumPlan=await has({plan:'premium'});
        
        // We ask Clerk’s backend for the full user details using clerkClient.
        const user=await clerkClient.users.getUser(userId);
        

        // at initially when we call user.privateMetadata.free_usage then it is undefined so it will go to else then their it will create free_usage=0 then when we again come then we have define user.privateMetadata.free_usage

        if(!hasPremiumPlan && user.privateMetadata.free_usage){
            // user.privateMetadata contains custom/private info you stored about the user.
            req.free_usage=user.privateMetadata.free_usage
        }else{
            await clerkClient.users.updateUserMetadata(userId,{
                privateMetadata:{
                    free_usage:0
                }
            })
            req.free_usage=0;
        }
        req.plan=hasPremiumPlan ? 'premium':'free';
        next();
    }catch(error){
        res.json({success:false, message:error.message})
    }
}