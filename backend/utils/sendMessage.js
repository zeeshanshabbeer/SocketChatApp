const Message = require("../model/messageModel");
const storedata = async (data) => {
  console.log("store data=>", data);
  const sendMessage = await Message.findOne({ room: data.room });
  if (!sendMessage) {
    const message = await Message({
      room: data.room,
    });

    await message.chatmessage({
      name: data.author,
      message: data.message,
      date: data.time,
    });
    await message.save();
    return message;
    console.log("findroom=>", message);
  } else {
    await sendMessage.chatmessage({
      name: data.author,
      message: data.message,
      date: data.time,
    });
    await sendMessage.save();
    return sendMessage;
  }
};
module.exports = storedata;
