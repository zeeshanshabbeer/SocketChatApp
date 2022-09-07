import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  //   useEffect(() => {
  //     const eventListener = (data) => {
  //       setMessageList((list) => [...list, data]);
  //     };
  //     socket.on("receive_message", eventListener);

  //     return () => socket.off("receive_message", eventListener);
  //   }, [socket]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    return () => socket.off("receive_message");
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;

// import React, { useEffect, useState } from "react";

// function Chat({ socket, userName, room }) {
//   const [message, setMessage] = useState("");
//   const [messageDisplay, setMessageDisplay] = useState([]);

//   //   onClick sendMessage
//   const sendMessage = async () => {
//     if (message !== "") {
//       const messageData = {
//         room: room,
//         author: userName,
//         message: message,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };
//       await socket.emit("send_Message", messageData);

//       setMessageDisplay((list) => [...list, messageData]);
//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageDisplay((list) => [...list, data]);
//       console.log("data=> socket", data);
//     });
//   }, [socket]);

//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         <p>Live Chat</p>
//       </div>
//       <div className="chat-body">
//         {messageDisplay.map((msg) => {
//           return (
//             <div
//               className="message"
//               id={userName === msg.author ? "you" : "other"}
//             >
//               <div>
//                 <div className="message-content">
//                   <p>{msg.message}</p>
//                 </div>
//                 <div className="message-meta">
//                   <p>{msg.time}</p>
//                   <p>{msg.author}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="chat-footer">
//         <input
//           type="text"
//           placeholder="hey.."
//           onChange={(event) => setMessage(event.target.value)}
//           onKeyPress={(event) => {
//             event.key === "Enter" && sendMessage();
//           }}
//         />
//         <button onClick={sendMessage}>&#9658;</button>
//       </div>
//     </div>
//   );
// }

// export default Chat;
