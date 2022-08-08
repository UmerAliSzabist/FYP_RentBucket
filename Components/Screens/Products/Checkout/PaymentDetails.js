import React from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, TextInput, ScrollView, PermissionsAndroid, Platform, ImageBackground, ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";

const PaymentDetails = (props) => {

    const handleClose = () => {
        props.dialogClose(false)
    }

    return (
        <View>
            <Modal isVisible={true}>
                <View style={{ flex: 0.5, backgroundColor: 'white' , borderRadius:10,}}>
                    <View style={{ flex: 0.8 }}>
                        <View style={{ flex: 0.2, borderTopLeftRadius:10, borderTopRightRadius:10, backgroundColor: '#8B0000', justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white' }}>PAYMENT RECIEVED</Text>
                        </View>
                        <View style={{ flex: 0.8, justifyContent: 'center', alignContent: 'center', alignItems:'center' }}>
                            <Image
                                style={{ width: 200, height: 150 }}
                                source={require('../../../../assets/Payment-success.png')}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { handleClose() }}
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
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    );
}

export default PaymentDetails;

