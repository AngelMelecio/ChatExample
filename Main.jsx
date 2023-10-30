import React from 'react'
import { ThemeProvider } from './src/context/ThemeContext'
import { ChatProvider } from './src/screens/Chat/context/ChatContext'
import ChatScreen from './src/screens/Chat/ChatScreen'

const Main = () => {
  return (
    <ThemeProvider>
        <ChatProvider>
            <ChatScreen/>
        </ChatProvider>
    </ThemeProvider>
  )
}

export default Main