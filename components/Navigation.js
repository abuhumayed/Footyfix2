import React from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddChatScreen from '../screens/AddChatScreen';
import ChatScreen from '../screens/ChatScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';




const fullScreenWidth = Dimensions.get('window').width

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        
        />
      </Stack.Navigator>
    );
  }
  function ProfileStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ tabBarLabel: 'Profile!' }}
        />
      </Stack.Navigator>
    );
  }
  function SettingsStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Setting"
          component={Settings}
    
        />
      </Stack.Navigator>
    );
  }
  function ChatStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Group Chat"
          component={HomeScreen}
       
        />
          <Stack.Screen name = 'AddChat' component = {AddChatScreen}/>
          <Stack.Screen name = 'Chat' component = {ChatScreen}/>
      </Stack.Navigator>
    );
  }
  export default function Navigation(props) {
    return (
       <NavigationContainer>
           <Tab.Navigator 
           screenOptions = {({route}) =>({
               headerTitle : () => <Text>Header</Text> ,
               headerStyle: { backgroundColor: "#ECFAED"},
               headerTitleStyle: {color: "#067B25"},
               headerTintColor: "#067B25",
               tabBarIcon : ({focused,color,size,padding}) =>{
                let iconName;
                if(route.name === 'Home' )
                {
                    iconName = focused ? 'home' : 'home-outline' 
                }else if (route.name === 'Chat'){
                    iconName = focused ? 'chatbox-sharp' : 'chatbox-outline' 
                }else if (route.name === 'Profile'){
                    iconName = focused ? 'Person' : 'person-outline' 
                }else if (route.name === 'Settings'){
                    iconName = focused ? 'settings-outline' : 'settings-sharp' 
                }
        
                return (
                    <Ionicons 
                    name = {iconName} 
                    size = {size} 
                    color = {color}
                     style = {{ paddingBottom :padding }} 
                     
                     />
                );
               },
           })}
                 tabBarOptions = {{
                     activeTintColor: '#067B25',
                     inactiveTintColor: '#ECFAED',
                     labelStyle: {fontSize :16},
                     style : {width: fullScreenWidth }
                 }}
           >
            <Tab.Screen name = "Home" component = {HomeStackScreen} />
            <Tab.Screen name = "Profile" component = {ProfileStackScreen} />
            <Tab.Screen name = "Chat" component = {ChatStackScreen} />
            <Tab.Screen name = "Settings" component = {SettingsStackScreen} />
           </Tab.Navigator>
       </NavigationContainer>
    )
}



const styles = StyleSheet.create({})
