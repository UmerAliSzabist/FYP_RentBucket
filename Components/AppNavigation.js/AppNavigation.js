import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import { DrawerContent } from '../AppNavigation.js/SideBar';

import Axios from 'axios';

import SignIn from '../Screens/SignIn';
import Address from '../Screens/SignupScreens/Address'
import SignUp from '../Screens/SignupScreens/SignUp';

import Computers from '../Screens/Products/Computers/Computers';
import Cameras from '../Screens/Products/Cameras/Cameras';
import PostAd from '../Screens/PostAds/PostAds';
import Cart from '../Screens/Cart/Cart'
import MyAds from '../Screens/MyAds/MyAds';
import RentedProducts from '../Screens/RentedProducts/RentedProducts';
import UpgradeAccount from '../Screens/UpgradeAccount/UpgradeAccount';
import SecurityDeposite from '../Screens/SecurityDeposite/SecurityDeposite';

import SearchIcon from 'react-native-vector-icons/Feather';
import DrawerIcon from 'react-native-vector-icons/FontAwesome';
import HomeIcon from 'react-native-vector-icons/AntDesign'
import PostAdsIcon from 'react-native-vector-icons/MaterialIcons'
import CartIcon from 'react-native-vector-icons/AntDesign'
import AccountIcon from 'react-native-vector-icons/MaterialIcons'
import MyOrder from 'react-native-vector-icons/MaterialCommunityIcons';
import MyAdsIcon from 'react-native-vector-icons/Ionicons';
import CameraIcon from 'react-native-vector-icons/EvilIcons';
import LaptopIcon from 'react-native-vector-icons/FontAwesome';
import RentedIcon from 'react-native-vector-icons/Entypo'

import { useSelector } from 'react-redux';
import ProductDetails from '../Screens/Products/ProductDetails/ProductDetail';
import RentNow from '../Screens/Products/Checkout/RentNow';
import SearchProduct from '../Screens/Products/SearchProduct/SearchProduct';

import Checkout from '../Screens/Products/Checkout/Checkout'

import Icon from 'react-native-vector-icons/FontAwesome';


import RiderHome from '../RiderScreen/RiderHome/RiderHome';
import BASE_URL from '../Config';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const splashScreen = ({ navigation }) => {
    setTimeout(() => {
        navigation.replace('SignIn');
    }, 3000);
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            backgroundColor: 'white'
        }}>
            <Image style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                height: 200,
                width: 200
            }}
                source={require('../../assets/Logo.png')} />
        </View>
    )
}



// const CustomtabBarButton = ({childern, onPress}) => {
//     <TouchableOpacity
//         style={{
//             top: -30,
//             justifyContent:'center',
//             alignItems:'center',
//             ...style.shadowContainer
//         }}
//         onPress={onPress}
//     >
//         <View style={{width:70, height:70, borderRadius:35, backgroundColor:'red'}}>
//             {childern}
//         </View>
//     </TouchableOpacity>

// }

const RidersStackedScreens = ({ navigation }) => {
    return <Stack.Navigator
        screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: "#8B0000" },
            headerTitleStyle: { color: 'white' },
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <DrawerIcon
                        name='bars'
                        size={25}
                        color='white'
                        style={{ marginLeft: 15, paddingLeft: 10 }}
                    />
                </TouchableOpacity>
            ),
        }}
    >
        <Stack.Screen name="RiderHome" component={RiderHome} options={{
            headerTitle: (props) => (
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>RENT BUCKET</Text>
            ),
            headerTitleAlign: 'center'
        }} />
    </Stack.Navigator>
}

const StackedScreens = ({ navigation }) => {
    return <Stack.Navigator
        screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: "#8B0000" },
            headerTitleStyle: { color: 'white' },
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <DrawerIcon
                        name='bars'
                        size={25}
                        color='white'
                        style={{ marginLeft: 15, paddingLeft: 10 }}
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('SearchProduct')}>
                    <SearchIcon
                        name='search'
                        size={25}
                        color='white'
                        style={{ marginRight: 15, paddingRight: 10 }}
                    />
                </TouchableOpacity>
            )
        }}
    >
        <Stack.Screen name="TabbedHome" component={TabbedScreens} options={{
            headerTitle: (props) => (
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>RENT BUCKET</Text>
            ),
            headerTitleAlign: 'center'
        }} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{
            headerRight: () => (
                <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => navigation.goBack()}>
                    <Icon
                        name='angle-left'
                        size={35}
                        color='white'
                        style={{ marginRight: 15, paddingRight: 10 }}

                    />
                </TouchableOpacity>),
            headerTitle: (props) => (
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Product Detail</Text>
            ),
            headerTitleAlign: 'center'
        }} />
        <Stack.Screen name="RentNow" component={RentNow} options={{
            headerRight: () => (
                <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => navigation.goBack()}>
                    <Icon
                        name='angle-left'
                        size={35}
                        color='white'
                        style={{ marginRight: 15, paddingRight: 10 }}

                    />
                </TouchableOpacity>),
            headerTitle: (props) => (
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Shipment Details</Text>
            ),
            headerTitleAlign: 'center'
        }} />
        <Stack.Screen name="SearchProduct" component={SearchProduct} options={{
            headerRight: () => (
                <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => navigation.goBack()}>
                    <Icon
                        name='angle-left'
                        size={35}
                        color='white'
                        style={{ marginRight: 15, paddingRight: 10 }}

                    />
                </TouchableOpacity>),
            headerTitle: (props) => (
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Search Product</Text>
            ),
            headerTitleAlign: 'center'
        }} />
         <Stack.Screen name="SecurityDeposite" component={SecurityDeposite} options={{
            headerRight: () => (
                <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => navigation.goBack()}>
                    <Icon
                        name='angle-left'
                        size={35}
                        color='white'
                        style={{ marginRight: 15, paddingRight: 10 }}

                    />
                </TouchableOpacity>),
            headerTitle: (props) => (
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Security Deposite</Text>
            ),
            headerTitleAlign: 'center'
        }} />
        <Stack.Screen name="UpgradeAccont" component={UpgradeAccount} options={{
            headerRight: () => (
                <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => navigation.navigate('TopTabs')}>
                    <Icon
                        name='angle-left'
                        size={35}
                        color='white'
                        style={{ marginRight: 15, paddingRight: 10 }}

                    />
                </TouchableOpacity>),
            headerTitle: (props) => (
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Upgrade Account</Text>
            ),
            headerTitleAlign: 'center'
        }} />
    </Stack.Navigator>
}

const TabbedScreens = () => {
    return (
        <Tab.Navigator
            activeColor="red"
            inactiveColor="black"
            screenOptions={{
                indicatorStyle: { width: 50, left: "18%" },
            }}
            barStyle={{ backgroundColor: "white", position: 'absolute', bottom: 5, left: 20, right: 20, elevation: 0, borderRadius: 15, height: 75, justifyContent: 'center', alignContent: 'center', alignItems: 'center', ...style.shadowContainer }}
        >
            <Tab.Screen name="TopTabs" component={TopTabs}
                options={{
                    title: "Products",
                    tabBarLabel: "Products", tabBarIcon: ({ color }) => (
                        <HomeIcon name="home" color={color} size={25} />
                    )
                }} />
            <Tab.Screen name="PostAd" component={PostAd}
                options={{
                    title: "PostAd",
                    tabBarLabel: "PostAd",
                    tabBarIcon: ({ color }) => (
                        <PostAdsIcon name='post-add' color={color} size={25} />
                    )
                }} />
            <Tab.Screen name="MyAds" component={MyAds}
                options={{
                    title: "My Ads",
                    tabBarLabel: "My Ads", tabBarIcon: ({ color }) => (
                        <AccountIcon name="account-circle" color={color} size={24} />
                    )
                }} />
                  <Tab.Screen name="MyRentedProducts" component={RentedProducts}
                options={{
                    title: "Rented Products",
                    tabBarLabel: "Rented Products", tabBarIcon: ({ color }) => (
                        <RentedIcon name="shopping-bag" color={color} size={24} />
                    )
                }} />
        </Tab.Navigator>
    );
}

function TopTabs() {
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#DC143C',
                tabBarInactiveTintColor: 'black',
                tabBarPressColor: 'pink',
                tabBarIndicatorStyle: { width: 100, left: '9%', backgroundColor: 'red' },
                tabBarLabelStyle: { textTransform: 'uppercase', fontSize: 12, fontWeight: 'bold' },
                tabBarStyle: { backgroundColor: "white", position: 'absolute', top: 6, left: 40, right: 40, elevation: 0, borderRadius: 15, height: 65, justifyContent: 'center', ...style.shadowContainer },
            }}
        >
            <TopTab.Screen name="Computers" component={Computers}
                options={{
                    title: "Laptops",
                    tabBarLabel: "Laptops",
                    tabBarIcon: ({ focused }) => (
                        <LaptopIcon
                            name="laptop"
                            size={25}
                            color={focused ? '#DC143C' : 'black'}
                        />
                    )
                }}
            />
            <TopTab.Screen name="Cameras" component={Cameras}
                options={{
                    title: "Camera",
                    tabBarLabel: "Camera",
                    tabBarIcon: ({ focused }) => (
                        <CameraIcon
                            name="camera"
                            size={28}
                            color={focused ? '#DC143C' : 'black'}
                        />
                    )
                }}
            />
        </TopTab.Navigator>
    );
}

const AppNavigation = () => {

    const [userDetails, setUserDetails] = React.useState([]);
    const { loggedIn, token } = useSelector(state => state.auth);

    useEffect(() => {
        FetchUserDetails();
    }, [loggedIn])


    const FetchUserDetails = () => {

        Axios.get(`${BASE_URL}/user/userDetails`,
            {
                headers: {
                    'token': token
                }
            })
            .then((res) => {
                console.log(res.data)
                setUserDetails(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }

    if (loggedIn === true) {
        // if (loggedIn === true && userDetails.userType === 'user') {
            return (
                <NavigationContainer>
                    <StatusBar backgroundColor='#8B0000' />
                    <Drawer.Navigator initialRouteName="StackHome"
                        drawerContent={(props) => <DrawerContent {...props}/>}
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="StackedScreens" component={StackedScreens} />
                    </Drawer.Navigator>
                </NavigationContainer>
            );
        }
        // else if(loggedIn === true && userDetails.userType === 'rider') {
        //     return (
        //         <NavigationContainer>
        //             <Drawer.Navigator initialRouteName="StackHome"
        //                 drawerContent={(props) => <DrawerContent />}
        //                 screenOptions={{
        //                     headerShown: false,
        //                 }}
        //             >
        //                 <Stack.Screen name="RiderTab" component={RidersStackedScreens} />
        //             </Drawer.Navigator>
        //         </NavigationContainer>
        //     );
        // }
    // } 
    else {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='splash_Screen' component={splashScreen} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="Address" component={Address} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
export default AppNavigation;

const style = StyleSheet.create({
    shadowContainer: {
        shadowColor: 'red',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 0.5,
        elevation: 5,
    },
    container: {
        backgroundColor: 'maroon',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    logo: {
        marginTop: 8,
        marginBottom: 2,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 200
    },
    imgContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'maroon'
    },
    splashLogo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'maroon'
    },
    header_safe_area: {
        zIndex: 1000
    },
    header: {
        backgroundColor: '#000b44',
        height: 50,
        paddingHorizontal: 16
    },
    header_inner: {
        backgroundColor: '#000b44',
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
    },
})