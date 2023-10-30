import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from "../../context/ThemeContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { Button, PaperProvider, TextInput } from 'react-native-paper';

let dumyMessages = [
  { date: new Date("2013-04-08T10:28:43Z"), text: 'hello', own: true },
  { date: new Date("2013-04-08T10:29:43Z"), text: 'Whats up', own: false },
  { date: new Date("2013-04-08T10:30:43Z"), text: 'Testing this, because I want to know if you gonna come for me', own: true },
  { date: new Date("2013-04-08T10:30:50Z"), text: "Ok, I don't know, the future is uncertain, u know, but certanlly this app is so amazing ", own: false },
  { date: new Date("2013-04-08T11:01:03Z"), text: 'bruh', own: true },
]

const ChatScreen = () => {

  const insets = useSafeAreaInsets();
  const { colors } = useTheme()
  const scrollRef = React.useRef(null)
  const textAreaRef = React.useRef(null)
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState(dumyMessages)

  const handleSendMessage = () => {
    try{
      
      setMessageText('');               
      textAreaRef.current.blur()        
    }catch(e){

    }finally{

    }
  }

  const scrollToBottom = () => {
    console.log('padding', insets)
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (

    <View style={[styles.container, { paddingBottom: 60, backgroundColor: colors.background }]}>
      <KeyboardAvoidingView style={styles.full}>
        <View style={{ flex: 1, backgroundColor: '#22e' }}>
          <ScrollView ref={scrollRef}>
            {messages.map((message, index) =>
              <View style={[styles.messageContainer, message.own ? styles.myMessageContainer : styles.yourMessageContainer ]}>
                <View style={[styles.message, message.own ? styles.myMessage : styles.yourMessage]}>
                  <Text>
                    {message.text}
                  </Text>
                  <Text>
                    {message.date.toLocaleTimeString()}
                  </Text>
                </View>
              </View>)}
          </ScrollView>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', height: 55 }}>
          {/* Text Area */}
          <View style={{ flex: 1, paddingHorizontal: 5, backgroundColor: 'red' }}>
            <TextInput
              style={{
                ...styles.textBox,
                backgroundColor: colors.background,

              }}
              ref={textAreaRef}
              value={messageText}
              onChangeText={(e) => setMessageText(e)}
              placeholder='Escribe un mensaje'
              onFocus={scrollToBottom}
            />
          </View>
          {/* Send Button */}
          <View style={{ ...styles.totalCenter, width: 60, height: '100%' }}>
            <TouchableOpacity
              onPress={handleSendMessage}
              style={{ ...styles.totalCenter, backgroundColor: colors.primary, width: 50, height: 50, borderRadius: 25 }}>
              <Ionicons name="paper-plane-outline" style={{ fontSize: 23 }}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  full: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  
  textBox: {
    width: '100%',
    fontSize: 20,
    paddingHorizontal: 15,
    height: 55,
  },
  border: {
    borderWidth: 1,
    borderColor: 'gray',
  },

  totalCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  },
  messageContainer: {
    display:'flex',
    width: '100%',
    flexDirection: 'column',
    minHeight: 200,
    padding:10,
    
  },
  myMessageContainer:{
    alignItems:'flex-end',
    alignSelf:'flex-end',
    maxWidth: '80%',
  },  
  yourMessageContainer:{
    alignItems:'flex-start',
    alignSelf:'flex-start',
    maxWidth: '80%',
  },
  message:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between',
    padding:15,
    borderRadius: 25
  },
  myMessage:{
    alignItems:'flex-end',
    backgroundColor: '#3e3',
    borderBottomRightRadius:10,
  },  
  yourMessage:{
    alignItems:'flex-start',
    backgroundColor: '#e3e',
    borderBottomLeftRadius:5,
  }
});

export default ChatScreen;
