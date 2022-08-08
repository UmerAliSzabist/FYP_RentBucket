import React, { useEffect, useState } from 'react';
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
import BASE_URL from '../../Config';

const SignUp = ({ navigation, route }) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mobileNumber, setMobileNumber] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [cPassword, setCPassword] = React.useState("");

    const [hidePass, setHidePass] = React.useState("");
    const [confirmHidePass, setConfirmHidePass] = React.useState("");

    const [userNameError, setUserNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [mobileNumberError, setMobileNumberError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [cPasswordError, setCPasswordError] = React.useState("");

    const [addressDetails, setAddressDetails] = React.useState("");

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        const { otherParam } = route.params;
        console.log("-------");
        console.log(otherParam)
        setAddressDetails(otherParam)
    }, []);

    const reset = () => {
        setUserNameError("");
        setEmailError("");
        setMobileNumberError("");
        setPasswordError("");
        setCPasswordError("")
    }

    const onSubmitCheck = () => {
        if (password != cPassword) {
            alert('Both Password Does not Match')
        }
        else {
            userRegistration();
        }
    }

    const userNameValidator = () => {
        if (name === '') {
            setUserNameError("User Name cannot be empty")
        }
        else {
            setUserNameError("")
        }
    }

    const emailValidator = () => {
        if (email === '') {
            setEmailError("Email cannot be empty")
        }
        else if (reg.test(email) != true) {
            setEmailError("Enter valid syntax")
        }
        else {
            setEmailError("")
        }
    }
    const mobileNumberValidator = () => {
        if (mobileNumber === '') {
            setMobileNumberError("Mobile Number cannot be empty")
        }
        else {
            setMobileNumberError("")
        }
    }

    const passwordValidator = () => {
        if (password === '') {
            setPasswordError("Password cannot be empty")
        }
        else {
            setPasswordError("")
        }
    }

    const cPasswordValidator = () => {
        if (cPassword === '') {
            setCPasswordError("Password cannot be empty")
        }
        else {
            setCPasswordError("")
        }
    }


    const userRegistration = () => {
        if (name && email && mobileNumber && password && cPassword != '') {
            if (mobileNumber.length === 11) {
                setLoading(true)
                Axios.post(`${BASE_URL}/user/createUser`,
                    {

                        houseNo: addressDetails[0],
                        streetNo: addressDetails[1],
                        nearBy: addressDetails[2],
                        name: name,
                        email: email,
                        mobileNumber: mobileNumber,
                        password: password,
                        cPassword: cPassword
                    },
                )
                    .then((res) => {
                        console.log(res)
                        alert("User Created Successfully")
                        navigation.navigate('SignIn')
                        setLoading(false)
                    }).catch((error) => {
                        alert("User Already Exist")
                        console.log(error)
                    });
            }
            else {
                alert('Length of Mobile Number is not correct')
            }
        } else {
            setLoading(false)
            alert('Please Fill All Fields')
        }
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
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: '300', marginTop: 10, marginBottom: 10 }}>Create your account</Text>
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
                                        placeholder="User Name"
                                        onBlur={() => { userNameValidator() }}
                                        onChangeText={(text) => { setName(text), userNameValidator() }}
                                        value={name}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                <Text style={{ color: 'red', fontSize: 12 }}>{userNameError}</Text>
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
                                        placeholder="Email@gmail.com"
                                        onBlur={() => { emailValidator() }}
                                        onChangeText={(text) => { setEmail(text), emailValidator() }}
                                        value={email}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                <Text style={{ color: 'red', fontSize: 12 }}>{emailError}</Text>
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
                                        placeholder="0333-XXXXXXX"
                                        onBlur={() => { mobileNumberValidator() }}
                                        onChangeText={(text) => { setMobileNumber(text), mobileNumberValidator() }}
                                        value={mobileNumber}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                <Text style={{ color: 'red', fontSize: 12 }}>{mobileNumberError}</Text>
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
                                    <PasswordIcon
                                        style={{ marginRight: 10 }}
                                        name='lock'
                                        size={40}
                                        color='#8B0000'
                                    />
                                    <TextInput
                                        secureTextEntry={hidePass ? false : true}
                                        style={{
                                            fontSize: 16,
                                            width: '70%',
                                        }}
                                        placeholder="Password"
                                        onBlur={() => { passwordValidator() }}
                                        onChangeText={(text) => { setPassword(text), passwordValidator() }}
                                        value={password}
                                    />
                                    <Icon
                                        style={{ marginLeft: 10 }}
                                        name={hidePass ? 'eye' : 'eye-slash'}
                                        size={15}
                                        color="grey"
                                        onPress={() => setHidePass(!hidePass)}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                <Text style={{ color: 'red', fontSize: 12 }}>{passwordError}</Text>
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
                                    <ConfirmPasswordIcon
                                        style={{ marginRight: 14, marginLeft: 6 }}
                                        name='lock-reset'
                                        size={28}
                                        color='#8B0000'
                                    />
                                    <TextInput
                                        secureTextEntry={confirmHidePass ? false : true}
                                        style={{
                                            fontSize: 16,
                                            width: '70%',
                                        }}
                                        placeholder="Confirm Password"
                                        onBlur={() => { cPasswordValidator() }}
                                        onChangeText={(text) => { setCPassword(text), cPasswordValidator() }}
                                        value={cPassword}
                                    />
                                    <Icon
                                        style={{ marginLeft: 10 }}
                                        name={confirmHidePass ? 'eye' : 'eye-slash'}
                                        size={15}
                                        color="grey"
                                        onPress={() => setConfirmHidePass(!confirmHidePass)}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                                <Text style={{ color: 'red', fontSize: 12 }}>{cPasswordError}</Text>
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
                                    {
                                        loading === true ?
                                            (
                                                <ActivityIndicator
                                                    size={20}
                                                    color='white'
                                                />
                                            ) :
                                            (
                                                <Text style={{
                                                    color: 'white',
                                                    fontWeight: '500',
                                                    fontSize: 16
                                                }}>
                                                    Register Now
                                                </Text>
                                            )
                                    }

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


{/* <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 15 }} >
                            <Text>
                                Don't have an account? {' '}
                            </Text>
                            <TouchableOpacity>
                                <Text style={{ color: 'blue' }}>
                                    Register Now
                                </Text>
                            </TouchableOpacity>
                        </View> */}


{/* <LinearGradient style={{ flex: 1, alignItems: "center" }} colors={['white', 'white',]}>
            <StatusBar
                backgroundColor="#2980B9"
            />
            <View style={{ flex: 0.1, marginTop: 50, width: '100%', marginBottom: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/kuickpayLogo.png')}
                    style={{ width: 200, height: 45 }}
                />
            </View>
            <View style={{ flex: 0.9, width: '100%' }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{
                        marginTop: 15,
                        flexDirection: 'row',
                        backgroundColor: '#f2f3f4',
                        paddingHorizontal: 13,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 15,
                        width: '70%',
                        height: 60,
                        alignItems: 'center'
                    }}>
                        <UserIcon
                            style={{ marginRight: 10 }}
                            name='user'
                            size={40}
                            color='#297DCE'
                        />
                        <TextInput
                            style={{
                                fontSize: 16,
                                width: '70%',
                            }}
                            placeholder="Mobile Number"
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{
                        marginTop: 25,
                        flexDirection: 'row',
                        backgroundColor: '#f2f3f4',
                        paddingHorizontal: 13,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 15,
                        width: '70%',
                        height: 60,
                        alignItems: 'center'
                    }}>
                        <PasswordIcon
                            style={{ marginRight: 10 }}
                            name='lock'
                            size={40}
                            color='#297DCE'
                        />
                        <TextInput
                            style={{
                                fontSize: 16,
                                width: '70%',
                            }}
                            secureTextEntry
                            placeholder="Enter Passowrd"
                        />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#32C274',
                        width: '60%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 8,
                        borderRadius: 30,
                        marginVertical: 25
                    }}>
                        <Text style={{
                            padding: 5,
                            color: 'white',
                            fontWeight: '500',
                            fontSize: 16
                        }} >
                            LOGIN
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#32C274' }} />
                    <View>
                        <Text style={{ color: '#297DCE', width: 150, textAlign: 'center' }}>LOGIN WITH TPIN</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#32C274' }} />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{
                        backgroundColor: 'white',
                        width: '25%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 8,
                        borderRadius: 10,
                        marginVertical: 25,
                        borderWidth: 1,
                        borderColor: '#32C274'
                    }}>
                        <Text style={{
                            padding: 5,
                            color: '#32C274',
                            fontWeight: '500',
                            fontSize: 16,
                        }}>
                            TPIN
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#32C274' }} />
                    <View>
                        <Text style={{ color: '#297DCE', width: 120, textAlign: 'center' }}>FINGERPRINT</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#32C274' }} />
                </View>
                <View style={{ marginBottom: 10, marginTop: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Image
                            source={require('../../assets/FP.png')}
                            style={{ width: 150, height: 65, marginBottom: 15 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Text style={{
                        color: 'black',
                        fontWeight: '500',
                        fontSize: 16
                    }}>
                        DON'T HAVE AN ACCOUNT?
                    </Text>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate('Registration')}>
                        <Text style={{ color: 'blue' }}>
                            REGITSER NOW
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient> */}