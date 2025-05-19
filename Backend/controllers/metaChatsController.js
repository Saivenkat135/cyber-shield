const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const metachats=require("../models/metaChatsModel");
const user=require("../models/usermodel");

// Create a chat
exports.createChat = catchAsyncErrors(async (req, res) => {
    const { chat_name, participants } = req.body;

    try {
        // console.log("received catname and participants");
      // Find the highest chat_id
      const highestChat = await metachats.findOne().sort({ chat_id: -1 });

    //   if(!highestChat){
    //     return res.status(201).json({message:"there is no chats "});
    //   }

      // Determine new chat_id (increment highest by 1, or set to 1 if none exists)
      const newChatId = highestChat ? highestChat.chat_id + 1 : 1;

      // Create new chat
      const newChat = await metachats.create({
        chat_id: newChatId,
        chat_name,
        participants,
      });
  
      // Update each participant in the User model by adding chat_id to their chat_ids array
      await user.updateMany(
        { email: { $in: participants } },
        { $push: { chats: newChatId } }
      );
  
      res.status(201).json({
        success: true,
        message: "Chat created successfully",
        chat: newChat,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(400).json({ error: error.message, success: false });
    }
  });


  exports.getMetaChats=catchAsyncErrors(async(req,res)=>{

    const {chat_id}=req.body;
    try{

        const meta_chat_info=await metachats.findOne({chat_id});

        if(!meta_chat_info){
            return res.status(201).json({success:false,message:"no meta available for this chat"});
        }
        
        return res.status(202).json({success:true,message:"cat meta found successfully",data:meta_chat_info});

    }catch(error){
        console.error("Error:", error);
      res.status(400).json({ error: error.message, success: false });
    }
  });