import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, TextInput, ScrollView, PermissionsAndroid, Platform, ImageBackground, ActivityIndicator } from 'react-native';
import Axios from 'axios';
import moment from 'moment';

import { Avatar } from 'react-native-paper';

import AddImage from 'react-native-vector-icons/AntDesign'
import Model from 'react-native-vector-icons/AntDesign';
import City from 'react-native-vector-icons/MaterialCommunityIcons';
import Category from 'react-native-vector-icons/MaterialCommunityIcons';
import BASE_URL from '../../../Config';

const ProductDetails = ({ navigation, route }) => {

    const [adDetails, setAdDetails] = React.useState();
    const [sellerDetail, setSellerDetail] = React.useState();
    const [adId, setAdId] = React.useState('');
    const [adTitle, setAdTitle] = React.useState('');
    const [adImage, setAdImage] = React.useState('');
    const [adCategory, setAdCategory] = React.useState('');
    const [adPrice, setAdPrice] = React.useState('');
    const [adDescription, setAdDescription] = React.useState('');
    const [adStartDate, setAdStartDate] = React.useState('');

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const { otherParam } = route.params;
        console.log("-------");
        console.log(otherParam)
        Details(otherParam)
    }, []);

    const Details = (adId) => {
        Axios.get(`${BASE_URL}/user/adDetails/${adId}`)
            .then((res) => {
                console.log('add details')
                setAdDetails(res.data)
                console.log("aaaaaa", res.data)
                setLoading(false)
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <>
            {
                loading === true ?
                    (
                        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#8B0000" />
                        </View>
                    ) :
                    (
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            <View style={{ flex: 0.3, backgroundColor: '#F5F5F5' }}>
                                {
                                    adDetails.image ?
                                        (
                                            <Image
                                                source={{ uri: adDetails.image }} resizeMode='stretch' style={{ flex: 1 }}
                                            />
                                        ) : null
                                }
                            </View>
                            <View style={{ flex: 0.6 }}>
                                <ScrollView>
                                    <View style={{ margin: 10, padding: 5, paddingVertical: 10, flexDirection: 'column', }}>
                                        <Text style={{ color: 'black', fontWeight: '400', fontSize: 16, marginBottom: 5 }}>
                                            {adDetails.title}
                                        </Text>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14, marginBottom: 5 }}>PKR {adDetails.price}</Text>
                                        {/* <Text style={{ color: 'grey', fontWeight: '400', fontSize: 13 }}>{adAdres}</Text> */}
                                    </View>
                                    <View style={{ padding: 5, paddingVertical: 10, flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center', marginBottom: 5 }}>

                                            <View style={{ margin: 5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                                <City
                                                    name='city-variant-outline'
                                                    size={35}
                                                    color='black'
                                                />
                                                <Text style={{ color: 'black', fontWeight: '400', fontSize: 15, }}>Karachi</Text>
                                            </View>

                                            <View style={{ margin: 5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                                <Category
                                                    name='filter-menu-outline'
                                                    size={35}
                                                    color='black'
                                                />
                                                <Text style={{ color: 'black', fontWeight: '400', fontSize: 15 }}>{adDetails.category}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ margin: 10, padding: 5, paddingVertical: 10, flexDirection: 'column' }}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Province</Text>
                                            <Text style={{ color: 'black' }}>Sindh</Text>
                                        </View>

                                        {/* <View style={{ flex: 1, height: 2, backgroundColor: '#E8E8E8', width: '100%', alignSelf: 'center', marginBottom: 10, marginTop: 10 }} /> */}

                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Color</Text>
                                            <Text style={{ color: 'black' }}>Red</Text>
                                        </View> */}

                                        <View style={{ flex: 1, height: 2, backgroundColor: '#E8E8E8', width: '100%', alignSelf: 'center', marginBottom: 10, marginTop: 10 }} />

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Date</Text>
                                            <Text style={{ color: 'black' }}>{moment(adDetails.startDate).format('Do MMM YYYY')}</Text>
                                        </View>

                                    </View>

                                    <View style={{ margin: 10, padding: 5, paddingVertical: 10, flexDirection: 'column' }}>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>Seller Description</Text>
                                        </View>
                                        <View style={{}}>
                                            <Text style={{ color: 'black', fontWeight: '300', fontSize: 15 }}>
                                                {adDetails.description}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#E8E8E8', width: '95%', alignSelf: 'center' }} />
                                    <View style={{ margin: 10, padding: 5, paddingVertical: 10 }}>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>Seller Details</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Avatar.Image size={90} />
                                            <View style={{ margin: 15 }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 12 }}>{adDetails.userId.name}</Text>
                                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 10 }}>{adDetails.mobileNumber}</Text>
                                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 10 }}>{adDetails.address.houseNo} {adDetails.address.streetNo}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity style={{ width: '60%', backgroundColor: '#8B0000', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 7 }} onPress={() => { navigation.navigate('RentNow', { otherParam: adDetails }) }}>
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>
                                            Proceed To Checkout
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
            }
        </>

    );
}

export default ProductDetails;