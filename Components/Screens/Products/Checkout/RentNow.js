import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, TextInput, ScrollView, PermissionsAndroid, Platform, ImageBackground, ActivityIndicator } from 'react-native';
import Axios from 'axios';
import moment from 'moment';

import { useSelector } from 'react-redux';

import PaymentDetails from './PaymentDetails';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BASE_URL from '../../../Config';


const RentNow = ({ navigation, route }) => {

    const { token } = useSelector(state => state.auth);
    const [productId, setProductId] = React.useState('');
    const [image, setImage] = React.useState('');
    const [name, setName] = React.useState('');
    const [city, setCity] = React.useState('');
    const [mobileNumber, setMobileNumber] = React.useState('');
    const [houseNo, setHouseNo] = React.useState('');
    const [streetNo, setStreetNo] = React.useState('');
    const [nearBy, setNearBy] = React.useState('');
    const [noOfDays, setNoOfDays] = React.useState('');
    const [subTotalPrice, setSubTotalPrice] = React.useState('');
    const [price, setPrice] = React.useState('');

    const [adDetails, setAdDetails] = React.useState('');

    const [nameError, setNameError] = React.useState('');
    const [mobileNumberError, setMobileNumberError] = React.useState('');
    const [cityError, setCityError] = React.useState('');
    const [houseNoError, setHouseNoError] = React.useState('');
    const [streetNoError, setStreetNoError] = React.useState('');
    const [nearByError, setNearByError] = React.useState('');
    const [noOfDaysError, setNoOfDaysError] = React.useState('');
    const [returnDate, setReturnDate] = React.useState(new Date())

    const [loading, setLoading] = React.useState(true);

    const [clickProceedCheckout, setClickProceedCheckout] = React.useState(false);

    const [securityDeposite, setSecurityDeposite] = React.useState('');


    useEffect(() => {
        const { otherParam } = route.params;
        setAdDetails(otherParam)
        console.log("insode Rent now");
        console.log(otherParam)
        setProductId(otherParam._id)
        paymentDetials();

    }, []);

    const paymentConfirmation = () => {


        Axios.post(`${BASE_URL}/user/changeProductStatus/${productId}`,
            {
                headers: {
                    'token': token
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                console.log('done')
                RentProduct();
            }).catch((error) => {
                console.log(error)
                console.log('Not Done')
            });
    }

    const RentProduct = () => {
        const data = {
            productId: productId,
            image: adDetails.image,
            name: name,
            title: adDetails.title,
            category: adDetails.category,
            mobileNumber: mobileNumber,
            city: city,
            houseNo: houseNo,
            streetNo: streetNo,
            nearBy: nearBy,
            numberOfDays: noOfDays,
            price: subTotalPrice,
            returnDate: returnDate
        }
        console.log(data)
        Axios.post(`${BASE_URL}/user/rentProduct`, data,
            {
                headers: {
                    'token': token
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                setClickProceedCheckout(true)
            }).catch((error) => {
                console.log(error)
                alert("Something went wrong")
            });
    }

    const ProceedToCheckout = () => {

        console.log(noOfDays);

        var allowedAmount = securityDeposite * 3;

        if (productId && name && mobileNumber && city && houseNo && nearBy && streetNo && noOfDays && returnDate != '') {

            if (city === 'Karachi' || 'karachi') {
                if (allowedAmount > subTotalPrice) {
                    paymentConfirmation();
                    // const Shipmentetails = [productId, name, mobileNumber, city, houseNo,streetNo, nearBy,  noOfDays, subTotalPrice, adDetails.image, adDetails.title, adDetails.category]
                    // reset()
                    // navigation.navigate('PaymentDetails', { otherParam: Shipmentetails })
                } else {
                    alert('Your Security Deposite is Less Kindly Upgrade Your Account')
                    navigation.navigate("UpgradeAccont")
                }

            }
            else {
                alert('We only Deliver in Karachi')
            }

        } else {
            alert("Please Fill All Fields")
        }
    }

    const paymentDetials = () => {

        Axios.get('http://10.0.2.2:5000/user/findPaymentDetials',
            {
                headers: {
                    'token': token
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                setSecurityDeposite(res.data[0].securityDeposite)
                console.log(securityDeposite)
                setLoading(false);
            }).catch((error) => {
                console.log(error)
                alert("Something went wrong")
            });
    }

    const handleClose = (data) => {
        setClickProceedCheckout(data);
        navigation.navigate('TabbedHome');
    };

    const reset = () => {
        setNameError("");
        setMobileNumberError("");
        setCityError("")
    }


    const nameValidator = () => {
        if (name === '') {
            setNameError("Name field cannot be empty")
        }
        else {
            setNameError("")
        }
    }

    const mobileNumberValidator = () => {
        if (mobileNumber === '') {
            setMobileNumberError("Mobile Number field cannot be empty")
        }
        else {
            setMobileNumberError("")
        }
    }

    const houseNoValdator = () => {
        if (houseNo === '') {
            setHouseNoError("House No field cannot be empty")
        }
        else {
            setHouseNoError("")
        }
    }
    const streetNoValidator = () => {
        if (streetNo === '') {
            setStreetNoError("Street field cannot be empty")
        }
        else {
            setStreetNoError("")
        }
    }
    const nearByValidator = () => {
        if (nearBy === '') {
            setNearByError("Near By field cannot be empty")
        }
        else {
            setNearByError("")
        }
    }
    const noOfDaysValidator = () => {

        var startdate = moment().format("DD-MM-YYYY hh:mm:ss");

        console.log(startdate)

        var new_date = moment(startdate, "DD-MM-YYYY hh:mm:ss").add(noOfDays, 'days');

        console.log(new_date)

        setReturnDate(new_date)

        setSubTotalPrice(noOfDays * adDetails.price)

        if (noOfDays === '') {
            setNoOfDaysError("Days field cannot be empty")
        }
        else {
            setNoOfDaysError("")
        }
    }
    const cityValidator = () => {
        if (city === '') {
            setCityError("City field cannot be empty")
        }
        else {
            setCityError("")
        }
    }

    return (

        <View style={{ flex: 1 }}>

            {
                loading === true ?
                    (
                        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#8B0000" />
                        </View>
                    )
                    :
                    (
                        <ScrollView style={{ height: hp('100%'), padding: 10, margin: 5, backgroundColor: 'white' }}>
                            {
                                clickProceedCheckout === true ?
                                    (
                                        <PaymentDetails dialogClose={handleClose} />
                                    ) : null
                            }
                            <View style={{ height: hp('12%'), }}>
                                <View style={{ height: hp('3%'), }}>
                                    <Text style={{ color: 'black', marginLeft: 10 }}>Name <Text style={{ color: 'red' }}>*</Text> </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#fffafa',
                                    paddingHorizontal: 13,
                                    borderColor: '#ccc',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    width: wp('75%'),
                                    height: hp('6%'),
                                    alignItems: 'center'
                                }}>
                                    <TextInput
                                        style={{
                                            fontSize: 16,
                                            width: wp('75%'),
                                        }}
                                        placeholder="Enter your Full Name"
                                        onBlur={nameValidator}
                                        onChangeText={(text) => { setName(text), nameValidator }}
                                        value={name}
                                    />
                                </View>
                                <View style={{ alignItems: 'flex-start', marginLeft: 20 }}>
                                    <Text style={{ color: 'red', fontSize: 12 }}>{nameError}</Text>
                                </View>
                            </View>
                            <View style={{ height: hp('12%'), }}>
                                <View style={{ height: hp('3%'), }}>
                                    <Text style={{ color: 'black', marginLeft: 10 }}>Mobile Number <Text style={{ color: 'red' }}>*</Text> </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#fffafa',
                                    paddingHorizontal: 13,
                                    borderColor: '#ccc',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    width: wp('75%'),
                                    height: hp('6%'),
                                    alignItems: 'center'
                                }}>
                                    <TextInput
                                        style={{
                                            fontSize: 16,
                                            width: wp('75%'),
                                        }}
                                        placeholder="XXXX-XXXXXXX"
                                        keyboardType="numeric"
                                        onBlur={mobileNumberValidator}
                                        onChangeText={(text) => { setMobileNumber(text), mobileNumberValidator }}
                                        value={mobileNumber}
                                    />
                                </View>
                                <View style={{ alignItems: 'flex-start', marginLeft: 20 }}>
                                    <Text style={{ color: 'red', fontSize: 12 }}>{mobileNumberError}</Text>
                                </View>
                            </View>
                            <View style={{ height: hp('12%'), flexDirection: 'row' }}>
                                <View style={{ flex: 0.5, }}>
                                    <View style={{ height: hp('3%'), marginLeft: 10 }}>
                                        <Text style={{ color: 'black' }}>City <Text style={{ color: 'red' }}>*</Text> </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#fffafa',
                                        paddingHorizontal: 13,
                                        borderColor: '#ccc',
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        width: wp('40%'),
                                        height: hp('6%'),
                                        alignItems: 'center'
                                    }}>
                                        <TextInput
                                            style={{
                                                fontSize: 16,
                                                width: wp('75%'),
                                            }}
                                            placeholder="City"
                                            onBlur={cityValidator}
                                            onChangeText={(text) => { setCity(text), cityValidator }}
                                            value={city}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'flex-start', marginLeft: 20 }}>
                                        <Text style={{ color: 'red', fontSize: 12 }}>{cityError}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.5, }}>
                                    <View style={{ height: hp('3%'), marginLeft: 10 }}>
                                        <Text style={{ color: 'black' }}>House # <Text style={{ color: 'red' }}>*</Text> </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#fffafa',
                                        paddingHorizontal: 13,
                                        borderColor: '#ccc',
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        width: wp('40%'),
                                        height: hp('6%'),
                                        alignItems: 'center'
                                    }}>
                                        <TextInput
                                            style={{
                                                fontSize: 16,
                                                width: '70%',
                                            }}
                                            placeholder="House #"
                                            onBlur={houseNoValdator}
                                            onChangeText={(text) => { setHouseNo(text), houseNoValdator }}
                                            value={houseNo}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'flex-start', marginLeft: 20 }}>
                                        <Text style={{ color: 'red', fontSize: 12 }}>{houseNoError}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: hp('12%'), flexDirection: 'row' }}>
                                <View style={{ flex: 0.5, }}>
                                    <View style={{ height: hp('3%'), marginLeft: 10 }}>
                                        <Text style={{ color: 'black' }}>Street # <Text style={{ color: 'red' }}>*</Text> </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#fffafa',
                                        paddingHorizontal: 13,
                                        borderColor: '#ccc',
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        width: wp('40%'),
                                        height: hp('6%'),
                                        alignItems: 'center'
                                    }}>
                                        <TextInput
                                            style={{
                                                fontSize: 16,
                                                width: wp('75%'),
                                            }}
                                            placeholder="Street #"
                                            onBlur={streetNoValidator}
                                            onChangeText={(text) => { setStreetNo(text), streetNoValidator }}
                                            value={streetNo}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'flex-start', marginLeft: 20 }}>
                                        <Text style={{ color: 'red', fontSize: 12 }}>{streetNoError}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.5, }}>
                                    <View style={{ height: hp('3%'), marginLeft: 10 }}>
                                        <Text style={{ color: 'black' }}>Near By <Text style={{ color: 'red' }}>*</Text> </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#fffafa',
                                        paddingHorizontal: 13,
                                        borderColor: '#ccc',
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        width: wp('40%'),
                                        height: hp('6%'),
                                        alignItems: 'center'
                                    }}>
                                        <TextInput
                                            style={{
                                                fontSize: 16,
                                                width: wp('75%'),
                                            }}
                                            placeholder="Near By"
                                            onBlur={nearByValidator}
                                            onChangeText={(text) => { setNearBy(text), nearByValidator }}
                                            value={nearBy}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'flex-start', marginLeft: 20 }}>
                                        <Text style={{ color: 'red', fontSize: 12 }}>{nearByError}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: hp('12%'), }}>
                                <View style={{ height: hp('3%'), marginLeft: 10 }}>
                                    <Text style={{ color: 'black' }}>No Of Days <Text style={{ color: 'red' }}>*</Text> </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#fffafa',
                                    paddingHorizontal: 13,
                                    borderColor: '#ccc',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    width: wp('75%'),
                                    height: hp('6%'),
                                    alignItems: 'center'
                                }}>
                                    <TextInput
                                        style={{
                                            fontSize: 16,
                                            width: wp('75%'),
                                        }}
                                        keyboardType="numeric"
                                        placeholder="Number Of Days want to rent"
                                        onBlur={noOfDaysValidator}
                                        onChangeText={(text) => { setNoOfDays(text), noOfDaysValidator }}
                                        value={noOfDays}
                                    />
                                </View>
                                <View style={{ alignItems: 'flex-start', marginLeft: 20 }}>
                                    <Text style={{ color: 'red', fontSize: 12 }}>{noOfDaysError}</Text>
                                </View>
                            </View>
                            <View style={{ height: hp('4%'), justifyContent: 'center', margin: 5 }}>
                                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: 'black' }}>Total Price: <Text style={{ color: 'red' }}> {subTotalPrice}</Text></Text>
                            </View>

                            <View style={{ height: hp('12%'), shadowOffset: { width: 5, height: 5 }, elevation: 5, backgroundColor: '#ffffff', shadowOpacity: 0.20, shadowRadius: 1.41, shadowColor: '#000', margin: 10, padding: 10, flexDirection: 'row', }}>
                                <View style={{ flex: 0.5, backgroundColor: '#F5F5F5' }}>
                                    {
                                        adDetails.image ?
                                            (
                                                <Image
                                                    source={{ uri: adDetails.image }} resizeMode='stretch' style={{ flex: 1 }}
                                                />
                                            ) : null
                                    }
                                </View>
                                <View style={{ justifyContent: 'space-around', backgroundColor: 'white' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ marginLeft: 15, }} >
                                            <Text style={{ fontSize: 14, fontWeight: '500', color: 'black' }}>{adDetails.title}</Text>
                                        </View>
                                        <View style={{ marginLeft: 15, marginTop: 5 }} >
                                            <Text style={{ fontSize: 10, fontWeight: '300', color: 'black' }}>{adDetails.category}</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: 15, flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 12, fontWeight: '700', color: 'black' }}>Rs.{adDetails.price}<Text style={{ fontSize: 10 }}>/ day</Text></Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: hp('10%'), alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => { ProceedToCheckout() }}
                                    style={{
                                        width: '40%',
                                        backgroundColor: '#8B0000',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 8,
                                        borderRadius: 100,
                                    }}>
                                    <Text style={{
                                        color: 'white',
                                        fontWeight: '500',
                                        fontSize: 16
                                    }}>
                                        Rent Now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    )
            }
        </View>


    );
}

export default RentNow;

{/* <View style={{ padding: 20, backgroundColor: 'white', margin: 10, borderRadius: 20 }}>
                                    <View>
                                        <Text style={{ color: 'black', marginLeft: 10 }}>Name <Text style={{ color: 'red' }}>*</Text> </Text>
                                        <View style={{
                                            marginTop: 8,
                                            flexDirection: 'row',
                                            backgroundColor: '#fffafa',
                                            paddingHorizontal: 13,
                                            borderColor: '#ccc',
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            width: '95%',
                                            height: 50,
                                            alignItems: 'center'
                                        }}>
                                            <TextInput
                                                style={{
                                                    fontSize: 16,
                                                    width: '70%',
                                                }}
                                                placeholder="Enter your Full Name"
                                                onBlur={nameValidator}
                                                onChangeText={(text) => { setName(text), nameValidator }}
                                                value={name}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                        <Text style={{ color: 'red', fontSize: 12 }}>{nameError}</Text>
                                    </View>
                                    {
                                        clickProceedCheckout === true ?
                                            (
                                                <PaymentDetails dialogClose={handleClose} />
                                            ) : null
                                    }
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{ color: 'black', marginLeft: 10 }}>Mobile Number <Text style={{ color: 'red' }}>*</Text> </Text>
                                        <View style={{
                                            marginTop: 8,
                                            flexDirection: 'row',
                                            backgroundColor: '#fffafa',
                                            paddingHorizontal: 13,
                                            borderColor: '#ccc',
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            width: '95%',
                                            height: 50,
                                            alignItems: 'center'
                                        }}>
                                            <TextInput
                                                style={{
                                                    fontSize: 16,
                                                    width: '70%',
                                                }}
                                                placeholder="XXXX-XXXXXXX"
                                                keyboardType="numeric"
                                                onBlur={mobileNumberValidator}
                                                onChangeText={(text) => { setMobileNumber(text), mobileNumberValidator }}
                                                value={mobileNumber}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                        <Text style={{ color: 'red', fontSize: 12 }}>{mobileNumberError}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ marginTop: 5, }}>
                                            <Text style={{ color: 'black', marginLeft: 10 }}>City <Text style={{ color: 'red' }}>*</Text> </Text>
                                            <View style={{
                                                marginTop: 8,
                                                flexDirection: 'row',
                                                backgroundColor: '#fffafa',
                                                paddingHorizontal: 13,
                                                borderColor: '#ccc',
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                width: '80%',
                                                height: 50,
                                                alignItems: 'center'
                                            }}>
                                                <TextInput
                                                    style={{
                                                        fontSize: 16,
                                                        width: '62%',
                                                    }}
                                                    placeholder="City"
                                                    onBlur={cityValidator}
                                                    onChangeText={(text) => { setCity(text), cityValidator }}
                                                    value={city}
                                                />
                                            </View>
                                            <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                                <Text style={{ color: 'red', fontSize: 12 }}>{cityError}</Text>
                                            </View>
                                        </View>

                                        <View style={{ marginTop: 5, }}>
                                            <Text style={{ color: 'black', marginLeft: 10 }}>House <Text style={{ color: 'red' }}>*</Text> </Text>
                                            <View style={{
                                                marginTop: 8,
                                                flexDirection: 'row',
                                                backgroundColor: '#fffafa',
                                                paddingHorizontal: 13,
                                                borderColor: '#ccc',
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                width: '80%',
                                                height: 50,
                                                alignItems: 'center'
                                            }}>
                                                <TextInput
                                                    style={{
                                                        fontSize: 16,
                                                        width: '62%',
                                                    }}
                                                    placeholder="House#"

                                                    onBlur={cityValidator}
                                                    onChangeText={(text) => { setCity(text), cityValidator }}
                                                    value={city}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                            <Text style={{ color: 'red', fontSize: 12 }}>{cityError}</Text>
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{ color: 'black', marginLeft: 10 }}>Address <Text style={{ color: 'red' }}>*</Text> </Text>
                                        <View style={{
                                            marginTop: 8,
                                            flexDirection: 'row',
                                            backgroundColor: '#fffafa',
                                            paddingHorizontal: 13,
                                            borderColor: '#ccc',
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            width: '95%',
                                            height: 50,
                                            alignItems: 'center'
                                        }}>
                                            <TextInput
                                                style={{
                                                    fontSize: 16,
                                                    width: '70%',
                                                }}
                                                placeholder="Enter Addrress"
                                                onBlur={addressValidator}
                                                onChangeText={(text) => { setAddress(text), addressValidator }}
                                                value={address}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                        <Text style={{ color: 'red', fontSize: 12 }}>{addressError}</Text>
                                    </View>
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{ color: 'black', marginLeft: 10 }}>Number Of Days <Text style={{ color: 'red' }}>*</Text> </Text>
                                        <View style={{
                                            marginTop: 8,
                                            flexDirection: 'row',
                                            backgroundColor: '#fffafa',
                                            paddingHorizontal: 13,
                                            borderColor: '#ccc',
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            width: '95%',
                                            height: 50,
                                            alignItems: 'center'
                                        }}>
                                            <TextInput
                                                style={{
                                                    fontSize: 16,
                                                    width: '70%',
                                                }}
                                                placeholder="Number Of Days want to rent"
                                                onBlur={noOfDaysValidator}
                                                onChangeText={(text) => { setNoOfDays(text), noOfDaysValidator }}
                                                value={noOfDays}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                        <Text style={{ color: 'red', fontSize: 12 }}>{noOfDaysError}</Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', margin: 10 }}>
                                        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: 'black' }}>Total Price: <Text style={{ color: 'red' }}> {subTotalPrice}</Text></Text>
                                    </View>

                                    <View style={{ height: '14%', shadowOffset: { width: 5, height: 5 }, elevation: 5, backgroundColor: '#ffffff', shadowOpacity: 0.20, shadowRadius: 1.41, shadowColor: '#000', margin: 10, padding: 10, flexDirection: 'row', }}>
                                        <View style={{ flex: 0.5, backgroundColor: '#F5F5F5' }}>
                                            {
                                                adDetails.image ?
                                                    (
                                                        <Image
                                                            source={{ uri: adDetails.image }} resizeMode='stretch' style={{ flex: 1 }}
                                                        />
                                                    ) : null
                                            }
                                        </View>
                                        <View style={{ justifyContent: 'space-around', backgroundColor: 'white' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={{ marginLeft: 15 }} >
                                                    <Text style={{ fontSize: 14, fontWeight: '500', color: 'black' }}>{adDetails.title}</Text>
                                                </View>
                                                <View style={{ marginLeft: 15, marginTop: 5 }} >
                                                    <Text style={{ fontSize: 10, fontWeight: '300', color: 'black' }}>{adDetails.category}</Text>
                                                </View>
                                            </View>
                                            <View style={{ marginLeft: 15, flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 12, fontWeight: '700', color: 'black' }}>Rs.{adDetails.price}<Text style={{ fontSize: 10 }}>/ day</Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => { ProceedToCheckout() }}
                                            style={{
                                                width: '40%',
                                                backgroundColor: '#8B0000',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 8,
                                                borderRadius: 100,
                                            }}>
                                            <Text style={{
                                                color: 'white',
                                                fontWeight: '500',
                                                fontSize: 16
                                            }}>
                                                Rent Now
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> */}