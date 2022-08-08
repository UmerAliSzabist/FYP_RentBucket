import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, TextInput, ScrollView, PermissionsAndroid, Platform, ImageBackground, ActivityIndicator } from 'react-native';
import PaymentDetails from './PaymentDetails';
import Axios from 'axios';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useSelector } from 'react-redux';
import BASE_URL from '../../../Config';

const Checkout = ({ navigation, route }) => {

    const { token } = useSelector(state => state.auth);

    const [cardNumber, setCardNumber] = React.useState('');
    const [nameOfCard, setNameOfCard] = React.useState('');
    const [expiration, setExpiration] = React.useState('');
    const [cvvNumber, setCvvNumber] = React.useState('');

    const [cardNumberError, setCardNumberError] = React.useState('');
    const [nameOfCardError, setNameOfCardError] = React.useState('');
    const [expirationError, setExpirationError] = React.useState('');
    const [cvvNumberError, setCvvNumberError] = React.useState('');

    const [shipmentDetails, setShipmentDetails] = React.useState([]);
    const [adDetails, setAdDetails] = React.useState([]);
    const [onClickPay, setOnClickPay] = React.useState(false);

    useEffect(() => {
        const { otherParam } = route.params;
        console.log("-------");
        console.log(otherParam)
        setShipmentDetails(otherParam)
    }, []);



    const handleClose = (data) => {
        setOnClickPay(data);
        navigation.navigate('TabbedHome');
    };

    const cardNumberValidator = () => {
        if (cardNumber === '') {
            setCardNumberError("Card Number cannot be empty")
        }
        else {
            setCardNumberError("")
        }
    }

    const cardNameValidator = () => {
        if (nameOfCard === '') {
            setNameOfCardError("Card Name cannot be empty")
        }
        else {
            setNameOfCardError("")
        }
    }

    const expirationValidator = () => {
        if (expiration === '') {
            setExpirationError("Expiry cannot be empty")
        }
        else {
            setExpirationError("")
        }
    }

    const cvvNumberValidator = () => {
        if (cvvNumber === '') {
            setCvvNumberError("CVV Number cannot be empty")
        }
        else {
            setCvvNumberError("")
        }
    }

    const reset = () => {
        setCardNumber('')
        setCvvNumber('')
        setExpiration('')
        setNameOfCard('')
    }

    const paymentConfirmation = () => {

        if (nameOfCard && cardNumber && expiration && cvvNumber != '') {

            console.log(shipmentDetails[0])
            Axios.post(`${BASE_URL}/user/changeProductStatus/${shipmentDetails[0]}`,
                {
                    headers: {
                        'token': token
                    }
                }
            )
                .then((res) => {
                    console.log(res.data)
                    console.log('done')
                    paymentProcess();
                }).catch((error) => {
                    console.log(error)
                    console.log('Not DOne')
                });
        } else {
            alert('Fields Cannot be Empty')
        }
    }

    const paymentProcess = () => {
        const data = {
            productId: shipmentDetails[0],
            cardNumber: cardNumber,
            nameOfCard: nameOfCard,
            expiration: expiration,
            cvvNumber: cvvNumber,
        }

        console.log(data);
        Axios.post(`${BASE_URL}/user/paymentDetails`, data,
            {
                headers: {
                    'token': token
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                console.log('done payment Process')
                reset();
                RentProduct();
            }).catch((error) => {
                console.log(error)
                console.log('Not done payment Process')
                alert("Something went wrong")
            });
    }

    const RentProduct = () => {
        console.log(shipmentDetails[7])
        const data = {
            productId: shipmentDetails[0],
            image: shipmentDetails[9],
            name: shipmentDetails[1],
            title: shipmentDetails[10],
            category: shipmentDetails[11],
            mobileNumber: shipmentDetails[2],
            city: shipmentDetails[3],
            houseNo: shipmentDetails[4],
            streetNo: shipmentDetails[5],
            nearBy: shipmentDetails[6],
            numberOfDays: shipmentDetails[7],
            price: shipmentDetails[8]
        }
        console.log(data)
        Axios.post(`${BASE_URL}/user/rentProduct/`, data,
            {
                headers: {
                    'token': token
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                setOnClickPay(true)
            }).catch((error) => {
                console.log(error)
                alert("Something went wrong")
            });
    }

    return (
        <View style={{ flex: 1, margin: 10 }}>


            <ScrollView >

                {
                    onClickPay === true ?
                        (
                            <PaymentDetails dialogClose={handleClose} />
                        ) : null
                }
                <View style={{ height: hp('50%'), backgroundColor: 'white', padding: 5, borderRadius: 10 }}>


                    <View style={{ flex: 0.23, justifyContent: 'center', }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'black', marginLeft: 10 }}>Card Number <Text style={{ color: 'red' }}>*</Text> </Text>
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
                                    placeholder="Enter Card Number"
                                    onBlur={cardNumberValidator}
                                    onChangeText={(text) => { setCardNumber(text), cardNumberValidator }}
                                    value={cardNumber}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                        <Text style={{ color: 'red', fontSize: 12 }}>{cardNumberError}</Text>
                    </View>

                    <View style={{ flex: 0.23, justifyContent: 'center' }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'black', marginLeft: 10 }}>Name on Card <Text style={{ color: 'red' }}>*</Text> </Text>
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
                                    placeholder="Enter Card Name"
                                    onBlur={cardNameValidator}
                                    onChangeText={(text) => { setNameOfCard(text), cardNameValidator }}
                                    value={nameOfCard}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                        <Text style={{ color: 'red', fontSize: 12 }}>{nameOfCardError}</Text>
                    </View>
                    <View style={{ flex: 0.23, justifyContent: 'center' }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'black', marginLeft: 10 }}>Expiration (MM/YY) <Text style={{ color: 'red' }}>*</Text> </Text>
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
                                    placeholder="Enter Card Expiry"
                                    onBlur={expirationValidator}
                                    onChangeText={(text) => { setExpiration(text), expirationValidator }}
                                    value={expiration}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                        <Text style={{ color: 'red', fontSize: 12 }}>{expirationError}</Text>
                    </View>
                    <View style={{ flex: 0.23, justifyContent: 'center' }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'black', marginLeft: 10 }}>CVV <Text style={{ color: 'red' }}>*</Text> </Text>
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
                                    placeholder="Enter 3 Digit CVV"
                                    onBlur={cvvNumberValidator}
                                    onChangeText={(text) => { setCvvNumber(text), cvvNumberValidator }}
                                    value={cvvNumber}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                        <Text style={{ color: 'red', fontSize: 12 }}>{cvvNumberError}</Text>
                    </View>
                </View>


                <View style={{
                    height: hp('20%'), alignItems: 'center', justifyContent: 'center'
                }}>

                </View>

                <View style={{ height: hp('17%'), padding: 10, justifyContent: 'flex-end', alignContent: 'flex-end', backgroundColor: 'white', borderRadius: 10 }}>
                    <View style={{ flex: 0.6, }}>
                        <View style={{ flex: 0.4, flexDirection: 'row' }}>
                            <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                <Text style={{ marginLeft: 10, color: 'black', fontWeight: '700', fontSize: 15 }}>Subtotal</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text style={{ marginRight: 10, color: 'black', fontWeight: '700', fontSize: 15 }}>Rs. {shipmentDetails[8]}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.6, flexDirection: 'row' }}>
                            <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                <Text style={{ marginLeft: 10, color: 'black', fontWeight: '700', fontSize: 18 }}>Total Amount</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text style={{ marginRight: 10, color: '#FF4500', fontWeight: '700', fontSize: 18 }}>Rs. {shipmentDetails[8]}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { paymentConfirmation() }}
                            style={{
                                width: '50%',
                                height: 40,
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
                                Pay Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Checkout;

