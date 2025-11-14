import sql from "../configs/db.js";

export const getUserCreations=async(req,res)=>{
    try{
    const {userId}=req.auth();

    const creations=await sql `SELECT * FROM creations WHERE user_id=${userId} ORDER BY created_at DESC`;

    res.json({success:true,creations})
    }
    catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

export const getPublishedCreations=async(req,res)=>{
    try{
        const creations=await sql `SELECT * FROM creations WHERE publish=true ORDER BY created_at DESC `;

        res.json({success:true,creations})
    }
    catch(error){
        console.log(error.message);
        return res.json({success:false,message:error.message})
    }
}

export const toggleLikeCreation=async(req,res)=>{
    try{
        const {userId}=req.auth();
        const {id}=req.body;

        const [creation]=await sql `SELECT * FROM creations WHERE id=${id}`

        if(!creation){
            return res.json({success:true,message:"Creation not found"})
        }

        const currLikes=creation.likes;//array of user who liked
        const userIdStr=userId.toString();//convert userId to string so that we can apply string functions like includes, compare,etc
        let updatedLikes;
        let message;

        if(currLikes.includes(userIdStr)){
            //if user lie in the currLikes array then update it remove the like of this user
            // filter() creates a new array that keeps all users except the one who unliked.
            updatedLikes=currLikes.filter((user)=>user!==userIdStr);
            message='Creation Unliked'
        }
        else{

            // ...currLikes-This is the spread operator — it copies all existing likes
            // [...currLikes,userIdStr]- This creates a new array that includes all previous likes plus the current user
            updatedLikes=[...currLikes,userIdStr]
            message='Creation Liked'
        }

        const formattedArray=`{${updatedLikes.join(',')}}` //joins array elements with commas

        await sql`UPDATE creations SET likes=${formattedArray}::text[] WHERE id=${id}`;
        // ::text[] → tells PostgreSQL to treat it as a text array type

        res.json({success:true,message})

    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}