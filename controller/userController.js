const userModel = require('../model/userModel');


async function  createOne(req,res){
    try{
        console.log(req.body);
        let newUser = await userModel.create(req.body);
        if(newUser)
        res.status(200).end({
            status:"user created succesfully"
        });
    }catch(er){
        res.status(404).end(er);
    }
    
}
async function getallUser(req,res){
    const result = await userModel.find();
    if(result.length>0)
    res.status(200).json(result);
    else
    res.status(404).end("not found");
};
async function getUser(req,res)
{
    try{
        let query = req.body;
         let result = await userModel.find(query);
        res.status(200).json(result);
    
    }catch(er)
    {
        res.status(400).end("something went wrong");
    }
}
async function updateUser(req,res){

    try{
        let query = req.body;
        console.log(query);
        const result = await userModel.findOneAndUpdate(query[0],query[1],{new:true});
        if(result)
            res.status(200).json(result);
        else
            res.status(404).end("not found");
    }catch(err)
    {
        res.status(400).json({
            status:"something went wrong",
            error:err
        });
    }
   
}
async function deleteUser(req,res){
    let query= req.body;
    const result = await userModel.findOneAndDelete(query);
    if(result)
         res.status(200).json(result);
    else    
        res.status(404).end("not found");
}

module.exports={
    deleteUser,
    updateUser,
    getUser,
    getallUser,
    createOne
}







