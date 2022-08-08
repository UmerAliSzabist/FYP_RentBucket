import React from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, TextInput, ScrollView, ActivityIndicator, } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import MobileIcon from 'react-native-vector-icons/Fontisto'
import PasswordIcon from 'react-native-vector-icons/EvilIcons'
import Icon from 'react-native-vector-icons/FontAwesome5';

import Axios from 'axios';

import { LogIn } from '../Redux/actions/Action';

import { useDispatch } from 'react-redux';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BASE_URL from '../Config';

const SignIn = ({ navigation }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [hidePass, setHidePass] = React.useState("");

    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [loading, setLoading] = React.useState(false);

    const dispatch = useDispatch();

    const onLogin = () => {
        userLogin();
    }


    const reset = () => {
        setEmailError("");
        setPasswordError("");
    }

    const emailValidator = () => {
        if (email === '') {
            setEmailError("Email field cannot be empty")
        }
        else if (reg.test(email) != true) {
            setEmailError("Enter valid syntax")
        }
        else {
            setEmailError("")
        }
    }

    const passwordValidator = () => {
        if (password === '') {
            setPasswordError("Password field cannot be empty")
        }
        else {
            setPasswordError("")
        }
    }

    const userLogin = () => {

        if (email && password != '') {
            Axios.post(`${BASE_URL}/login`,
                {
                    email: email,
                    password: password,
                },
            )
                .then((res) => {
                    console.log(res)
                    const token = res.data.token;
                    const expiry = res.data.expiry;
                    setLoading(false)
                    dispatch(LogIn(token, expiry));
                }).catch((error) => {
                    console.log(error)
                    setLoading(false)
                    alert('Please Enter Valid Credentials')
                });
        }
        else {
            setLoading(false)
            alert('Please Fill All Fileds')
        }

    }

    return (
        <ScrollView style={{ height: hp('80%'), }}>
            <StatusBar backgroundColor='#8B0000' />
            <LinearGradient style={{ height: hp('20%'),  borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: 'red' }} colors={['#8B0000', '#2E2625']}>
            </LinearGradient>
            <View style={{ flex: 0.7, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, }}>
                <View style={{ flex: 1, }}>
                    <View style={{ marginTop: -30, flex: 0.95, borderRadius: 25, padding: 20, margin: 15, shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 3, backgroundColor: 'white' }}>
                        <View style={{ felx: 0.2, margin: 10, marginTop: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yello' }}>
                            <Image
                                style={{ width: 170, height: 100, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                                source={require('../../assets/Logo.png')}
                            />
                        </View>
                        <View style={{ flex: 0.7, justifyContent: 'center', alignContent: 'center', }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{
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
                            <View style={{ margin: 8, marginLeft: 20 }} >
                                <TouchableOpacity>
                                    <Text style={{ color: '#8B0000' }}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 20, alignItems: 'center' }}>
                                <TouchableOpacity
                                    disabled={loading ? true : false}
                                    onPress={() => { setLoading(true), onLogin() }}
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
                                                <View>
                                                    <ActivityIndicator size="large" color="white" />
                                                </View>
                                            ) : 
                                            (
                                                <Text style={{
                                                    color: 'white',
                                                    fontWeight: '500',
                                                    fontSize: 16
                                                }}>
                                                    Login
                                                </Text>
                                            )
                                    }
                                   
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 0.3, marginTop: 10, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }} >
                                <Text>
                                    Don't have an account? {' '}
                                </Text>
                                <TouchableOpacity onPress={() => { reset(), navigation.navigate('Address') }}>
                                    <Text style={{ color: '#8B0000' }}>
                                        Register Now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default SignIn;

