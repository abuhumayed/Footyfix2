import React, { useEffect, useState } from 'react';
import {  StyleSheet, View, Image, Text  } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Input} from 'react-native-elements';
import{ StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import FlatButton from '../shared/button';
import { auth,db } from "../firebase";

const LoginScreen = ({navigation}) => {
   const[email, setEmail] = useState('') 
   const[password, setPassword] = useState('') 

   useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Home");       //If User login is Authenticated go to login page
            }
        });
        return unsuscribe;
   },[])

   const signIn = () =>
   {
     auth.signInWithEmailAndPassword(email,password)
     .catch((error) => alert(error));
   }

    return (
    <KeyboardAvoidingView style = {styles.container}  behavior = "padding" enabled keyboardVerticalOffset={Platform.select({ ios: 60, android: 78 })}>
      
            <StatusBar style = "night"/>
            <Image 
            source = {require('../src/icons/Logo.png')}
            />
            <Image
            source = {require('../src/icons/FOOTYFIXText.png')}
            />
         
        <View style = {styles.inputContainer}>
         <Input 
         placeholder = "Email" 
         autoFocus type = "email"
         value = {email} 
         onChangeText={(text) => setEmail(text)}
          
          />
         <Input 
         placeholder = "Password" 
         secureTextEntry type = "password"
         value = {password}
         onChangeText={(text) => setPassword(text)}
         onSubmitEditing = {signIn}
         />
        </View>
        
        <FlatButton text = 'Login' onPress={signIn} />
         
         <FlatButton text = 'Register' onPress = {()=>navigation.navigate('Register')} />
        
        <Image resizeMode = 'stretch'  
              style = {{marginBottom : 0}}
            source = {require('../src/icons/FBlogin.png')} 
            />
            <Image resizeMode = 'stretch'   
            style = {{marginTop : 0}}
            source = {require('../src/icons/GoogleLogin.png')}
            />
        <View style = {{ height: 100}} />
        
       
        
    </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#ECFAED',
        flex : 1,
        alignItems: 'center',
    },
    inputContainer : {
         width : 300,

    },
    loginScreenButton:{
        width : 200,
        marginTop : 10,
        backgroundColor:'#067B25',
    },
    textLogin:{
       color: 'white',
         },
     
});
