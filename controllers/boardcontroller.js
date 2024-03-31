import kanban from '../models/Kanbanboard.js';
import task from '../models/task.js'
import logger from '../utils/logger.js'
//Creating a new board
export const createBoard = async(req,res)=>{
    console.log("Here Here Here Here........");
    const {title,description} = req.body;
    const userId = req.user.userId;
    try {
        if(!title){
           return res.status(400).json({"message":"Please enter a title"});
        }
        const newBoard = new kanban({
          title: title,
          description: description,
          user: userId,
        });
        await newBoard.save();
        logger.info(newBoard.toObject(),"Successful created new Board");
        return  res.status(201).json({"message":newBoard})

    } catch (error) {
        logger.error(error,"Failed with error");
        res.status(501).json({"message":"Internal server error"});
    }
}
//Getting boards
export const getBoards=async(req,res)=>{
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

export const getBoard = async(req,res)=>{
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

export const moveTask=async(req,res)=>{
const {boardId,taskId} = req.params
res.json({boardId,taskId});
}

export const createTask = async (req, res) => {
  try {
    const boardid = req.params.boardId;
    const userId = req.user.userId;
    const { title, description, labels, priority } = req.body;
    if (!title) {
      logger.error("Title required!");
      return res.status(400).json({ message: "Title and duedate required!" });
    }

    const currboard = await kanban.find({_id:boardid}).populate('user');
    if (!currboard) {
      logger.error("Board doesn't exist");
      return res
        .status(404)
        .json({ message: "This kanban board doesn't exist" });
    }

    const newTask = new task({
      title: title,
      description: description,
      user: userId,
      board: boardid,
      duedate: Date.now(),
      labels: labels,
      priority: priority,
    });

    // currboard[0].todo.push(newTask);
    await newTask.save();
    console.log("Hello Hello......");

    await kanban.updateOne(
      { _id: currboard[0]._id },
      { $push: { todo: newTask._id } }
    );

    logger.info(newTask.id, "Successfully created new Task with id: ");
    return res.status(201).json({"message":"Created new task","id":newTask.id});
  } catch (error) {
    logger.error(error, "Failed due to this error");
    return res.status(501).json({ message: "Internal server Error" });
  }
};

