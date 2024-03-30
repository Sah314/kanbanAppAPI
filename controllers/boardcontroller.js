import kanban from '../models/Kanbanboard.js';
//Creating a new board
export const createnewBoard = async(req,res)=>{
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

//Getting boards
export const getboards=async(req,res)=>{
    try {
        const userId = req.user.userId;
       const board = await kanban.find({userid:userId});
        if(!board){
            res.status(404).json({"message":"No boards for this user. Make sure user exists!"});
        }
        if(board.length ===0){
            res.status(204).json({"message":"No boards exist for this user"})
        }
       res.status(202).json({boards:board});
       console.log("The boards are: ",board); 
    } catch (error) {
        res.status(504).json({"message":error});
        console.error(error);
    }
    
    // console.log(boards.filter(boards=>boards.userid==req.user.userId));
    // res.json(boards.filter(boards=>boards.userid==req.user.userId));
}

export const getABoard = async(req,res)=>{
    try {
        console.log("Getting board")
         const id=req.params.boardId;
         const userId = req.user.userId;
         console.log(`boardid is ${id},userid is ${userId}`);
         const board = await kanban.findOne({ _id: id, userid: userId });
         if (!board ) {
            throw Error('Invalid Id');
         }
         res.json(board);
    } catch (error) {
        console.log(error);
    }
}
export const movetask=async(req,res)=>{
const {boardId,taskId} = req.params
res.json({boardId,taskId});
}
export const addnewtask=async(req,res)=>{
    try {
        const boardid = req.params.boardId;
        const userid = req.user.userId;
        const {title,description,duedate,labels,priority}=req.body;
                if (!title||!duedate ){
            return res.status(400).json({"message":"Title and duedate required!"});
        }
        const currboard = await kanban.find({userid:userid,_id:boardid});
        if(!currboard){
            return res.status(404).json({"message":"This kanban board doesn't exist"});
        }
        
        const newTask = {
            title:title,
            description:description,
            duedate:duedate,
            labels:labels,
            priority:priority
        }
        // currboard[0].todo.push(newTask);
        const updatedBoard = await kanban.updateOne(
            { _id: currboard[0]._id },
            { $push: { 'todo': newTask } }
          );       return res.status(201).json({updatedBoard});
        
    } 
    catch (error) {
        return res.status(501).json({"message":"Internal server Error"});
    }
   

}

