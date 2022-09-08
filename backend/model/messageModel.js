const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  roomMessage: [
    {
      name: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    },
  ],
});

//
MessageSchema.methods.chatmessage = async function (name, message, date) {
  try {
    this.roomMessage = this.roomMessage.concat(name, message, date);
    await this.save();
    return this.roomMessage;
  } catch (error) {
    console.log(error);
  }
};
//create the collection in database
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
