import React, { useLayoutEffect, useState }from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView,ScrollView, Keyboard} from 'react-native';
import {Avatar} from 'react-native-elements';
import {AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { db, auth } from '../firebase';
import * as firebase from 'firebase';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
const ChatScreen = ({navigation,route}) => {
     
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([])

     useLayoutEffect(() => {
         navigation.setOptions({
             title : 'Chat',
             headerBackTitleVisible : false,
             headerTitleAlign: 'left',

             headerTitle: () => (
                 <View
                    style={{
                        flexDirection: 'row',
                         alignItems:'center',

                    }}
                    >
                     <Avatar rounded
                             source = {{
                           uri:
                           messages [0] ?.data.photoURL,
                           
                           }}
                         />
                     <Text
                     style = {{ color:'#067B25',marginLeft: 10, fontWeight:'700' }}>{route.params.chatName}</Text>
                 </View>
             ),
             headerLeft: () =>(
               <TouchableOpacity
               style = {{marginLeft:10}}
               onPress = {navigation.goBack}

               >
                   <AntDesign name  = 'arrowleft' size = {24} color = '#067B25' />
               </TouchableOpacity>
             ),
             headerRight: () =>  (
                <View
                     style =  {{
                         flexDirection : 'row',
                         justifyContent : 'space-between',
                         width : 80,
                         marginRight : 20,
                     }}
                >
                <TouchableOpacity>
                 <FontAwesome name = 'video-camera' size={24} color="#067B25"/>
                </TouchableOpacity>
                <TouchableOpacity>
                 <Ionicons name = 'call' size={24} color="#067B25"/>
                </TouchableOpacity>
                </View>
             )
            });
      },[navigation, messages]);    

      const sendMessage = () => {
          Keyboard.dismiss();
          db.collection('chatsss').doc(route.params.id).collection('messagesss').add({
              timestamp:firebase.firestore.FieldValue.serverTimestamp(),
              message : input,
              displayName: auth.currentUser.displayName,
              email: auth.currentUser.email,
              photoURL: auth.currentUser.photoURL

          })
          setInput('')
      };
      
      useLayoutEffect(() => {
          const unsuscribe = db.collection('chatsss').doc(route.params.id)
          .collection('messagesss').orderBy('timestamp','asc')
          .onSnapshot((snapshot) => setMessages(
              snapshot.docs.map(doc => ({
                
                id: doc.id,
                data: doc.data()
                
              }) )
          ));

       return unsuscribe;    
      }),[route]

    return (
        <SafeAreaView style = {{backgroundColor : '#ECFAED', flex :1}}>
          <KeyboardAvoidingView 
          style = {styles.container} 
          behavior ={Platform.OS === 'ios' ? 'padding' : 'height' }
          keyboardVerticalOffset = {90}
          >
              <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <>
              <ScrollView contentContainerStyle = {{paddingTop : 15 }}>
                {messages.map(({id, data}) => (
                    data.email === auth.currentUser.email ? (
                        <View key = {id} style = {styles.reciever} >
                           <Avatar

                           //WEB container
                           
                              containerStyle = {{
                                  position : 'absolute',
                                  bottom: -15,
                                  right: -5,
                              }}
                              rounded
                              size = {30} 
                              position = 'absolute'
                              right = {-5}
                              bottom = {-15}
                              source ={{
                                  uri : data.photoURL
                              }} 
                           />
                           <Text style = {styles.recieverText}>
                            {data.message}
                           </Text>
                        </View>

                    ):(
                        <View 
                        key = {id} 
                        style= {styles.sender}>
                             <Avatar 
                              containerStyle = {{
                                position : 'absolute',
                                bottom: -15,
                                right: -5,
                            }}
                            rounded
                            size = {30} 
                            position = 'absolute'
                            right = {-5}
                            bottom = {-15}
                            source ={{
                                uri : data.photoURL
                            }} 
                             />
                           <Text style = {styles.senderText}> {data.message}</Text>
                           <Text style = {styles.senderName}> {data.displayName}</Text>
                        </View>
                    )
                ) )}
              </ScrollView>
            <View style = {styles.footer}>
               <TextInput value = {input} 
               onChangeText = {(text) => setInput(text)} 
               onSubmitEditing = {sendMessage}
               placeholder = 'Type a message'
               style = {styles.textInput} 
               />
             <TouchableOpacity onPress = {sendMessage} activeOpacity = {0.5}>
                  <Ionicons name = 'send' size={24} color="#067B25"/>
             </TouchableOpacity>
            
            </View>

        </>
          </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,

    },
    footer : {
       flexDirection : "row",
       alignItems : "center",
       width : "100%",
       padding : 15,
    },
    textInput : {
        bottom : 0,
        height : 40,
        flex : 1,
        marginRight: 15,
        backgroundColor : '#ffff',
        padding : 10, 
        color : 'grey',
        borderRadius : 30,
   },

   reciever : {
    padding : 15,
    backgroundColor : '#87EB7A', 
    alignSelf : 'flex-end',
    marginRight : 15,
    marginBottom : 20,
    maxWidth : '80%',
    position: 'relative',

   },

   sender : {
    padding : 15,
    backgroundColor : '#ECECEC',
    alignSelf : 'flex-start',  //left hand side of screen
    borderRadius : 20,
    margin : 15,
    maxWidth : '80%',
    position: 'relative',

   },
senderName : {
    left : 10,
    paddingRight : 10,
    fontSize : 10,
    color : "pink"

},
senderText : {
 color : 'black',
 fontWeight : '500',
 marginLeft: 10, 
 marginBottom : 15,


},
recieverText : {
    color : 'black',
    fontWeight : '500',
    marginLeft: 10, 
    
},

});
