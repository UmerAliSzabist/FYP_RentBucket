import React from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import {
    Alert,
    Box,
    IconButton,
    CloseIcon,
    HStack,
    VStack,
    Center,
    NativeBaseProvider,
} from "native-base"
import Axios from 'axios';

import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import UserIcon from 'react-native-vector-icons/EvilIcons'
import EmailIcon from 'react-native-vector-icons/Fontisto'
import MobileIcon from 'react-native-vector-icons/AntDesign'
import AddressIcon from 'react-native-vector-icons/SimpleLineIcons'
import PasswordIcon from 'react-native-vector-icons/EvilIcons'
import ConfirmPasswordIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/FontAwesome5';

const SignUp = ({ navigation }) => {
    const [houseNo, setHouseNo] = React.useState("");
    const [streetNo, setStreetNo] = React.useState("");
    const [nearBy, setNearBy] = React.useState("");
    // const [address, setAddress] = React.useState("");
    // const [password, setPassword] = React.useState("");
    // const [cPassword, setCPassword] = React.useState("");

    // const [hidePass, setHidePass] = React.useState("");
    // const [confirmHidePass, setConfirmHidePass] = React.useState("");

    const [houseNoError, setHouseNoError] = React.useState("");
    const [streetNoError, setStreetNoError] = React.useState("");
    const [nearByError, setNearByError] = React.useState("");
    // const [addressError, setAddressError] = React.useState("");
    // const [passwordError, setPasswordError] = React.useState("");
    // const [cPasswordError, setCPasswordError] = React.useState("");

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [loading, setLoading] = React.useState(false)

    const reset = () => {
        // setUserNameError("");
        // setEmailError("");
        // setMobileNumberError("");
        // setPasswordError("");
        // setCPasswordError("")
    }

    const onSubmitCheck = () => {

        if (houseNo && streetNo && nearBy) {
            const addressDetails = [houseNo, streetNo, nearBy]
            console.log(addressDetails)
            navigation.navigate('SignUp', { otherParam: addressDetails })
        }
        else{
            alert("Please Fill All Fields")
        }
    }

    const houseNoValidator = () => {
        if (houseNo === '') {
            setHouseNoError("User Name cannot be empty")
        }
        else {
            setHouseNoError("")
        }
    }

    const streetNoValidator = () => {
        if (streetNo === '') {
            setStreetNoError("Email cannot be empty")
        }
        else {
            setStreetNoError("")
        }
    }
    const nearByValidator = () => {
        if (nearBy === '') {
            setNearByError("Mobile Number cannot be empty")
        }
        else {
            setNearByError("")
        }
    }


    const userRegistration = () => {
        // if (name && email && mobileNumber && password && cPassword != '') {
        //     if(mobileNumber.length===11){
        //         setLoading(true)
        //     Axios.post('http://10.0.2.2:5000/user/createUser',
        //         {
        //             name: name,
        //             email: email,
        //             mobileNumber: mobileNumber,
        //             address: address,
        //             password: password,
        //             cPassword: cPassword
        //         },
        //     )
        //         .then((res) => {
        //             console.log(res)
        //             alert("User Created Successfully")
        //             navigation.navigate('SignIn')
        //             setLoading(false)
        //         }).catch((error) => {
        //             alert("User Already Exist")
        //             console.log(error)
        //         });
        //     }
        //     else{
        //         alert('Length of Mobile Number is not correct')
        //     }
        // } else {
        //     setLoading(false)
        //     alert('Please Fill All Fields')
        // }
    }


    return (
        <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#E8E8E8' }}>
            <StatusBar backgroundColor='#8B0000' />
            <LinearGradient style={{ flex: 0.2, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: 'red', padding: 60 }} colors={['#8B0000', '#2E2625']}>
            </LinearGradient>
            <View style={{ flex: 0.9, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, }}>
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: -90, flex: 0.95, borderRadius: 25, padding: 10, margin: 15, shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 3, backgroundColor: 'white' }}>
                        <View style={{ felx: 0.2, margin: 10, marginTop: 10, justifyContent: 'center' }}>
                            <Text style={{ color: '#8B0000', fontSize: 25, fontWeight: '600' }}>SignUp</Text>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: '300', marginTop: 10, marginBottom: 10 }}>Enter your Address</Text>
                        </View>
                        <View style={{ flex: 0.9, justifyContent: 'center', alignContent: 'center', }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{
                                    marginTop: 5,
                                    flexDirection: 'row',
                                    backgroundColor: '#fffafa',
                                    paddingHorizontal: 13,
                                    borderColor: '#ccc',
                                    borderWidth: 1,
                                    borderRadius: 30,
                                    width: '95%',
                                    height: 50,
                                    alignItems: 'center'
                                }}>
                                    <UserIcon
                                        style={{ marginRight: 8 }}
                                        name='user'
                                        size={40}
                                        color='#8B0000'
                                    />
                                    <TextInput
                                        style={{
                                            fontSize: 16,
                                            width: '70%',
                                        }}
                                        placeholder="Enter House Number"
                                        onBlur={() => { houseNoValidator() }}
                                        onChangeText={(text) => { setHouseNo(text), houseNoValidator() }}
                                        value={houseNo}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                <Text style={{ color: 'red', fontSize: 12 }}>{houseNoError}</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{
                                    marginTop: 8,
                                    flexDirection: 'row',
                                    backgroundColor: '#fffafa',
                                    paddingHorizontal: 13,
                                    borderColor: '#ccc',
                                    borderWidth: 1,
                                    borderRadius: 30,
                                    width: '95%',
                                    height: 50,
                                    alignItems: 'center'
                                }}>
                                    <EmailIcon
                                        style={{ marginRight: 15, marginLeft: 8 }}
                                        name='email'
                                        size={25}
                                        color='#8B0000'
                                    />
                                    <TextInput

                                        style={{
                                            fontSize: 16,
                                            width: '70%',
                                        }}
                                        placeholder="Street No"
                                        onBlur={() => { streetNoValidator() }}
                                        onChangeText={(text) => { setStreetNo(text), streetNoValidator() }}
                                        value={streetNo}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                <Text style={{ color: 'red', fontSize: 12 }}>{streetNoError}</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{
                                    marginTop: 8,
                                    flexDirection: 'row',
                                    backgroundColor: '#fffafa',
                                    paddingHorizontal: 13,
                                    borderColor: '#ccc',
                                    borderWidth: 1,
                                    borderRadius: 30,
                                    width: '95%',
                                    height: 50,
                                    alignItems: 'center'
                                }}>
                                    <MobileIcon
                                        style={{ marginRight: 15, marginLeft: 8 }}
                                        name='mobile1'
                                        size={25}
                                        color='#8B0000'
                                    />
                                    <TextInput

                                        style={{
                                            fontSize: 16,
                                            width: '70%',
                                        }}
                                        placeholder="Near By"
                                        onBlur={() => { nearByValidator() }}
                                        onChangeText={(text) => { setNearBy(text), nearByValidator() }}
                                        value={nearBy}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                <Text style={{ color: 'red', fontSize: 12 }}>{nearByError}</Text>
                            </View>

                            <View style={{ marginTop: 30, margin: 20, alignItems: 'center' }}>
                                <TouchableOpacity
                                    disabled={loading ? true : false}
                                    onPress={() => { onSubmitCheck() }}
                                    style={{
                                        width: '50%',
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
                                        Next
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 0.2, padding: 30, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }} >
                                <Text>
                                    Already have an account? {' '}
                                </Text>
                                <TouchableOpacity onPress={() => { reset(), navigation.navigate('SignIn') }}>
                                    <Text style={{ color: '#8B0000' }}>
                                        Login Now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>


    );
}

export default SignUp;