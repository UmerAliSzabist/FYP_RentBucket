import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, TextInput, ScrollView, PermissionsAndroid, Platform, ImageBackground } from 'react-native';

import AddImage from 'react-native-vector-icons/AntDesign'

const Cart = ({ navigation }) => {

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
                backgroundColor: 'white', padding: 5, margin: 5, marginTop: 7, marginRight: 10, marginLeft: 10
            }}>
                <View style={{flexDirection:'row'}}>
                    <View style={{ width: 150, height: 100, backgroundColor: 'red', margin: 10 }}>
                        <Text style={{ color: "red" }}>
                            GOOD
                        </Text>
                    </View>
                    <View style={{ margin: 10, justifyContent:'space-around'}} >
                        <View style={{flex:0.3, }}>
                            <Text style={{color:"black", fontSize:15, fontWeight:'500'}}>Headphone 3.5mm</Text>
                            <Text style={{color:"grey", fontSize:13, fontWeight:'300'}}>No Brand, Color Family Black</Text>
                        </View>
                        <View style={{flex:0.3, marginTop:10}}>
                            <Text style={{color:"orange", fontSize:15, fontWeight:'500'}}>Rs. 3500</Text>
                            {/* <Text style={{color:"grey", fontSize:13, fontWeight:'300'}}>No Brand, Color Family Black</Text> */}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Cart;