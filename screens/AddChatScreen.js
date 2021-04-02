import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FlatButton from '../shared/button';
import { Input,Icon } from "react-native-elements";
import { db } from '../firebase';


const AddChatScreen = ({ navigation }) => {
    const [input,setInput] = useState('');
  
    useLayoutEffect(() =>{
        navigation.setOptions({
            title : "Add a new chat",
            headerBackTitle : 'Chats',

        });
    },[navigation])

    const createChat = async () => {
        await db.collection('chatsss').add({
            chatName : input
        }).then (() => {
            navigation.goBack();
        }) 
        .catch((error) => alert(error))
    }

    return (
        <View style = {styles.container}>

            <Input
               placeholder = "Enter a chat name"
                value = {input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing = {createChat}
                leftIcon={
                    <Icon name = "wechat" type = "antdesign" size={24} color = "#067B25" />
                }
            />
            
        <FlatButton raised  text = 'Create new chat' onPress = {createChat} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor : '#ECFAED',
        flex : 1,
        alignItems: 'center',
        padding : 10,
        

    },
});
