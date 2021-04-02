import React from 'react'
import { StyleSheet, Text, View,SafeAreaView } from 'react-native'

const Home = (props) => {
    return (
        <SafeAreaView 
        style = {{flex : 1, justifyContent: 'center', alignItems:'center' }}
        >
            <Text>Home Screen</Text>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
