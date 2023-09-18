const kanban = require('../models/Kanbanboard');

const createnewBoard = async(req,res)=>{
    const {title,description,todo} = req.body;
    const userId = req.user.userId;
    try {
        if(!title){
           return res.status(400).json({"message":"Please enter a title"});
        }
        const newBoard = new kanban({
            title:title,
            description:description,
            userid:userId,
            todo:todo
        })
        await newBoard.save();
        console.log("Successful created new Board:",newBoard);
        return  res.status(201).json({"message":newBoard})

    } catch (error) {
        console.error(error);
        res.status(501).json({"message":"Internal server error"});
    }
}

const getboards=(req,res)=>{
    console.log(req.user);
    console.log(boards.filter(boards=>boards.userid==req.user.userId));
    res.json(boards.filter(boards=>boards.userid==req.user.username));
}

const movetask=(req,res)=>{
const {boardid,taskid} = req.params
res.json({boardid,taskid});
}

module.exports={getboards,createnewBoard,movetask};