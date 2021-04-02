import React from 'react'
import { StyleSheet, Text, View,SafeAreaView } from 'react-native'

const Settings = (props) => {
    return (
        <SafeAreaView 
        style = {{flex : 1, justifyContent: 'center', alignItems:'center' }}
        >
            <Text>Settings Screen</Text>
        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({})