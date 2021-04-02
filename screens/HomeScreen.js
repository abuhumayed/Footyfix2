import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View,SafeAreaView,ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import CustomListItem from '../components/CustomListItem'
import { auth,db } from "../firebase";


const HomeScreen = ({navigation}) => {
    const[chats,setChats] = useState ([]);

const signOutUser = () => {
     auth.signOut().then(()=>{
         navigation.replace("Login");
     });
};
    useEffect(() => {
     const unsuscribe = db.collection('chatsss').onSnapshot(snapshot => (
         setChats(snapshot.docs.map(doc =>({
            id : doc.id,          // data in FireStore database
            data: doc.data()     // data in Firestore Database
         })))
     )
     );
     return unsuscribe;
    },[])

    useLayoutEffect (() => {
       navigation.setOptions({
           title: 'Group Chats',
           headerTintStyle : {color: "black"},
           headerTintColor: 'black',
           headerLeft: () => 
               <View >
                   <TouchableOpacity onPress= {signOutUser} activeOpacity = {0.5}>
                       <Text style = {styles.signOutText} > Sign Out</Text>
               <Avatar marginLeft = {10} rounded source = {{uri: auth?.currentUser?.photoURL}} />
                 </TouchableOpacity>
               </View>
       ,
       headerRight: () =>(
           <View style ={{ flexDirection : 'row',
                           justifyContent : 'space-between',
                           width : 80,
                           marginRight:20,
           }}>
 <TouchableOpacity>
     
 </TouchableOpacity>
 <TouchableOpacity activeOpacity={0.5}
  onPress={() => navigation.navigate("AddChat")}
  activeOpacity = {0.5}
 >
     <SimpleLineIcons name = "plus" size ={24} color = '#067B25'/>

 </TouchableOpacity>
           </View>

       ),
               
       });
    },[navigation]);

    const enterChat = (id,chatName) =>{
       navigation.navigate ('Chat',{
           id,chatName,
       })
    } 


    return (
        <SafeAreaView style = {styles.container} >
            <ScrollView>
                {chats.map(({id, data:{ chatName }}) => (
                <CustomListItem key = {id} 
                id = {id}
                 chatName ={chatName} 
                 enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container :{
        height : '100%',
        backgroundColor : '#ECFAED',
    },
    signOutText :{

        color : 'red',
        fontWeight : '500',
        height : 18
    },
})
