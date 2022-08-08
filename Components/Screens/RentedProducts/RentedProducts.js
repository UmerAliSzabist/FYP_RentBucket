import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';
import Axios from 'axios';
import Like from 'react-native-vector-icons/Feather'

import { useSelector } from 'react-redux';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BASE_URL from '../../Config';

const MyAds = ({ navigation }) => {

    const { token } = useSelector(state => state.auth);

    const [myAdDetails, setMyAdDetails] = React.useState([])


    useEffect(() => {
        myRentedProducts();
    }, []);

    const myRentedProducts = () => {
        console.log(token)
        Axios.get(`http://10.0.2.2:5000/user/myRentedProducts`,
            {
                headers: {
                    'token': token
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                setMyAdDetails(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }


    return (
        <View style={{ flex: 1, padding: 5 }}>
            <ScrollView style={{ flex: 0.8 }}>
                {
                    myAdDetails.length > 0 ?
                        (
                            <View style={{ flex: 1, flexDirection: 'column', }}>
                                {
                                    myAdDetails.map((item) => (
                                        <View key={item._id} style={styles.product}>
                                            <View style={{ flex: 0.5 }}>
                                                <Image source={{ uri: item.image }} resizeMode='stretch' style={{ flex: 1 }} />
                                            </View>
                                            <View style={{ flex: 0.5, padding: 10, marginLeft: 10 }}>
                                                <View style={{ flex: 0.3, justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 19, color: 'black', fontWeight: 'bold', }}>{item.title}</Text>
                                                </View>
                                                <View style={{ flex: 0.2 }}>
                                                    <Text style={{ fontSize: 13, color: 'black' }}>{item.category}</Text>
                                                </View>
                                                <View style={{ flex: 0.2, justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 11, color: 'black' }}>Delivery Status: {item.deliveryStatus}</Text>
                                                </View>
                                                <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
                                                    <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                                        <Text style={{ fontSize: 13, color: 'black', color: 'black', fontWeight: 'bold', }}>Total Rs.{item.price}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        ) : <View >
                            <Text style={{ fontSize: 15, color: '#186c9b', fontWeight: 'bold' }}> No Result Found</Text>
                        </View>
                }
            </ScrollView>
            <View style={{ flex: 0.17 }}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    product: {
        display: "flex",
        flexDirection: "row",
        height: 150,
        backgroundColor: "#fff",
        padding: 10,
    },
})

export default MyAds;