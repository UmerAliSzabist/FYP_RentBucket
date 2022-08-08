import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import {
    DrawerItem,
    DrawerContentScrollView,
} from '@react-navigation/drawer';

import Computers from '../Screens/Products/Computers/Computers';

import MyAdsIcon from 'react-native-vector-icons/Ionicons';
import MyOrder from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoriesIcon from 'react-native-vector-icons/MaterialIcons';
import HomeIcon from 'react-native-vector-icons/AntDesign'
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SecurityDepositeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import UpgradeAccountIcon from 'react-native-vector-icons/MaterialIcons'

import { Avatar } from 'react-native-paper';

import { LogOut } from '../Redux/actions/Action';

import { useDispatch } from 'react-redux';

export function DrawerContent({navigation}) {

    useEffect(() => {
        console.log('sidebar')
    },[])
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView style={{ backgroundColor: '#8B0000' }} >
            <View>
                <View>
                    <View style={{ marginTop: 25, borderColor: "white",justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Avatar.Image size={90} style={{ marginBottom: '7%',}} />
                    </View>
                    <View>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 'bold',}}>
                            MUHAMMAD ANAS
                        </Text>
                    </View>
                    <DrawerItem
                        label="Home" style={{ marginTop: 40, borderBottomWidth: 3, borderColor: "white" }} labelStyle={{ color: "white" }}
                        onPress={() => navigation.navigate('TopTabs')} 
                        icon={() =>
                            <HomeIcon
                                name='home'
                                size={25}
                                color='white'
                                style={{ marginLeft: 10, paddingLeft: 10 }}
                            />
                        }
                    />
                     <DrawerItem
                        label="Upgrade Account" style={{ marginTop: 20, borderBottomWidth: 3, borderColor: "white" }} labelStyle={{ color: "white" }}
                        onPress={() => navigation.navigate('UpgradeAccont')} 
                        icon={() =>
                            <UpgradeAccountIcon
                                name='upgrade'
                                size={25}
                                color='white'
                                style={{ marginLeft: 10, paddingLeft: 10 }}
                            />
                        }
                    />
                    <DrawerItem
                        label="Security Deposite" style={{ marginTop: 20, borderBottomWidth: 3, borderColor: "white" }} labelStyle={{ color: "white" }}
                        onPress={() => navigation.navigate('SecurityDeposite')} 
                        icon={() =>
                            <SecurityDepositeIcon
                                name='account-lock'
                                size={25}
                                color='white'
                                style={{ marginLeft: 10, paddingLeft: 10 }}
                            />
                        }
                    />
                    {/* <DrawerItem
                        label="MyAds" style={{ marginTop: 20, borderBottomWidth: 3, borderColor: "white" }} labelStyle={{ color: "white" }}
                        icon={() =>
                            <MyAdsIcon
                                name='heart-circle-outline'
                                size={25}
                                color='white'
                                style={{ marginLeft: 10, paddingLeft: 10 }}
                            />
                        }
                    />
                    <DrawerItem
                        label="MyOrders" style={{ marginTop: 20, borderBottomWidth: 3, borderColor: "white" }} labelStyle={{ color: "white" }}
                        icon={() =>
                            <MyOrder name="truck-delivery-outline" color={'white'} size={25} style={{ marginLeft: 10, paddingLeft: 10 }} />
                        }
                    /> */}
                    <DrawerItem
                        onPress={()=> { dispatch(LogOut()) }}
                        label="Logout" style={{ marginTop: 20, borderBottomWidth: 3, borderColor: "white" }} labelStyle={{ color: "white" }}
                        icon={() =>
                            <LogoutIcon
                                name='logout'
                                size={25}
                                color='white'
                                style={{ marginLeft: 10, paddingLeft: 10 }}
                            />
                        }
                    />
                </View>
            </View>
            {/* <View style={{ flexDirection: 'column-reverse' }}>
                <TouchableOpacity onPress={() => { props.logout() }}>
                    <View style={styles.preference}>
                        <PaymentIcons name="payments" color={'white'} size={25} style={{ marginLeft: 10, paddingLeft: 10 }} />
                        <Text style={{ fontWeight: 'bold', color: "white", textAlign: 'left' }}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View> */}
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: '#2E8B57',
    // },
    // drawerContent: {
    //     flex: 1,
    // },
    // userInfoSection: {
    //     paddingLeft: 20,
    // },
    // title: {
    //     marginTop: 20,
    //     fontWeight: 'bold',
    // },
    // caption: {
    //     fontSize: 14,
    //     lineHeight: 14,
    // },
    // row: {
    //     marginTop: 20,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // section: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginRight: 15,
    // },
    // paragraph: {
    //     fontWeight: 'bold',
    //     marginRight: 3,
    // },
    // drawerSection: {
    //     marginTop: 15,
    // },
    // preference: {
    //     flexDirection: 'row',
    //     justifyContent: 'flex-start',
    //     paddingVertical: 12,
    //     paddingHorizontal: 20
    // },
});