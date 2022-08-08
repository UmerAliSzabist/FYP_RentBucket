import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, TextInput, ScrollView, PermissionsAndroid, Platform, ImageBackground, ActivityIndicator } from 'react-native';
import PaymentDetails from '../Products/Checkout/PaymentDetails';
import Axios from 'axios';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useSelector } from 'react-redux';
import BASE_URL from '../../Config';

const Checkout = ({ navigation, route }) => {

    const { token } = useSelector(state => state.auth);

    const [loading, setLoading] = useState(true);

    const [id, setId] = React.useState('');
    const [cardNumber, setCardNumber] = React.useState('');
    const [nameOfCard, setNameOfCard] = React.useState('');
    const [expiration, setExpiration] = React.useState('');
    const [cvvNumber, setCvvNumber] = React.useState('');
    const [amount, setAmount] = React.useState();

    const [cardNumberError, setCardNumberError] = React.useState('');
    const [nameOfCardError, setNameOfCardError] = React.useState('');
    const [expirationError, setExpirationError] = React.useState('');
    const [cvvNumberError, setCvvNumberError] = React.useState('');
    const [amountError, setAmountError] = React.useState('');

    const [alreadyDeporiter, setAlreadyDepositer] = React.useState('')

    const [onClickPay, setOnClickPay] = React.useState(false);

    useEffect(() => {
        findPaymentDetials();
    }, []);

    const findPaymentDetials = () => {
        Axios.get(`${BASE_URL}/user/findPaymentDetials`,
            {
                headers: {
                    'token': token
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                setAlreadyDepositer(res.data)
                setLoading(false)
            }).catch((error) => {
                console.log(error)
            });
    }



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

    const amountValidator = () => {
        if (amount === '') {
            setAmountError("Amount cannot be empty")
        }
        else {
            setAmountError("")
        }
    }

    const reset = () => {
        setCardNumber('')
        setCvvNumber('')
        setExpiration('')
        setNameOfCard('')
        setAmount()
    }

    const paymentProcess = () => {

        if( amount >= 5000 ) {
            const data = {
                nameOfCard: nameOfCard,
                cardNumber: cardNumber,
                expiration: expiration,
                cvvNumber: cvvNumber,
                securityDeposite: amount
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
                    setOnClickPay(true)
                }).catch((error) => {
                    console.log(error)
                    console.log('Not done payment Process')
                    alert("Something Went Wrong")
                });
        } else{
            alert("Mininum Amount is 5000")
        }
        
    }

    return (
        
        <View style={{ flex: 1}}>
            {
                alreadyDeporiter != '' ?
                    (
                        <View style={{ flex: 1, backgroundColor:'white', justifyContent:'center', alignContent:'center'}}>
                            <Text style={{ margin:10, padding:10, fontSize:15, color:'red', fontWeight:'bold', textAlign:'center'}}>You are Already a Depositer to Upgrade Your Account Tap on Upgrade Account</Text>
                        </View>
                    ) :
                    (
                        <ScrollView style={{ margin: 10 }} >

                            {
                                onClickPay === true ?
                                    (
                                        <PaymentDetails dialogClose={handleClose} />
                                    ) : null
                            }
                            <View style={{ height: hp('68%'), backgroundColor: 'white', padding: 5, borderRadius: 10 }}>
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
                                                // editable={false}
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
                                                keyboardType='numeric'
                                                // editable={false}
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
                                                // editable={false}
                                                keyboardType='numeric'
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
                                                // editable={false}
                                                keyboardType='numeric'
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


                                <View style={{ flex: 0.23, justifyContent: 'center' }}>
                                    <View style={{ padding: 10 }}>
                                        <Text style={{ color: 'black', marginLeft: 10 }}>Amount<Text style={{ color: 'red' }}>*</Text> </Text>
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
                                                placeholder="Enter Amount"
                                                onBlur={amountValidator}
                                                onChangeText={(text) => { setAmount(text), amountValidator }}
                                                value={amount}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                    <Text style={{ color: 'red', fontSize: 12 }}>{amountError}</Text>
                                </View>
                            </View>


                            <View style={{
                                height: hp('13%'), alignItems: 'center', justifyContent: 'center'
                            }}>

                            </View>

                            <View style={{ height: hp('8%'), padding: 10, justifyContent: 'flex-end', alignContent: 'flex-end', borderRadius: 10 }}>

                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => { paymentProcess() }}
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
                    )
            }
        </View>
    );
}

export default Checkout;

