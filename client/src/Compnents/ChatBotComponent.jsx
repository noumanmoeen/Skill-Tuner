import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
class ChatBotComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          id: "0",
          message: "Welcome to Skill Tuner",
          trigger: "1",
        },
        {
          id: "1",
          message: "What is your name?",
          trigger: "2",
        },
        {
          id: "2",
          user: true,
          trigger: "3",
        },
        {
          id: "3",
          message: "Hi {previousValue}, nice to meet you!",
          trigger: "4",
        },
        {
          id: "4",
          message: "Please Tell Me what you want to ask",
          trigger: "5",
        },
        {
          id: "5",
          user: true,
          trigger: "6",
        },
        {
          id: "6",
          message: "your question is {previousValue}",
          end: true,
        },
      ],
    };
  }
  render() {
    return (
      <>
        {" "}
        <ThemeProvider
          theme={{
            background: "#f5f8fb",
            headerBgColor: "blue",
            headerFontColor: "#fff",
            headerFontSize: "15px",
            botBubbleColor: "#42a5f5",
            botFontColor: "#fff",
            userBubbleColor: "#fff",
            userFontColor: "#4a4a4a",
          }}
        >
          <ChatBot
            floating={true}
            headerTitle="Lets Talk"
            steps={this.state.steps}
            // hideBotAvatar={true}
            // speechSynthesis={{ enable: true, lang: "en" }}
          />
        </ThemeProvider>
      </>
    );
  }
}

export default ChatBotComponent;
