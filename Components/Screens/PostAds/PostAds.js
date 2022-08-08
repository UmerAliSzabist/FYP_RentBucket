import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, TextInput, ScrollView, PermissionsAndroid, Platform, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';

import AddImage from 'react-native-vector-icons/AntDesign'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { color } from 'react-native-reanimated';

import { useSelector } from 'react-redux';
import BASE_URL from '../../Config';

async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}

const PostAd = ({ navigation }) => {

    const { token } = useSelector(state => state.auth);

    const [imageResourse, setImageResource] = React.useState({});
    const [selectedImage, setSelectedImage] = React.useState(false);

    const [title, setTitle] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [mobileNumber, setMobileNumber] = React.useState('');
    const [city, setCity] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [houseNo, setHouseNo] = React.useState('');
    const [streetNo, setStreetNo] = React.useState('');
    const [nearBy, setNearBy] = React.useState('');

    const [titleError, setTitleError] = React.useState('');
    const [categoryError, setCategoryError] = React.useState('');
    const [mobileNumberError, setMobileNumberError] = React.useState('');
    const [cityError, setCityError] = React.useState('');
    const [priceError, setPriceError] = React.useState('');
    const [descriptionError, setDescriptionError] = React.useState('');
    const [houseNoError, setHouseNoError] = React.useState('');
    const [streetNoError, setStreetNoError] = React.useState('');
    const [nearByError, setNearByError] = React.useState('');

    const [bank, setbank] = useState(null);

    const reset = () => {
        setImageResource('')
        setTitle('')
        setCategory('')
        setMobileNumber('')
        setCity('')
        setPrice('')
        setDescription('')
        setNearBy('')
        setStreetNo('')
        setHouseNo('')
        setbank('')
    }

    const titleValidator = () => {
        if (title === '') {
            setTitleError("Title field cannot be empty")
        }
        else {
            setTitleError("")
        }
    }
    const categoryValidator = () => {
        if (category === '') {
            setCategoryError("Category field cannot be empty")
        }
        else {
            setCategoryError("")
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
    const cityValidator = () => {
        if (city === '') {
            setCityError("City field cannot be empty")
        }
        else {
            setCityError("")
        }
    }
    const priceValidator = () => {
        if (price === '') {
            setPriceError("Price field cannot be empty")
        }
        else {
            setPriceError("")
        }
    }
    const descriptionValidator = () => {
        if (description === '') {
            setDescriptionError("Description field cannot be empty")
        }
        else {
            setDescriptionError("")
        }
    }
    const houseNoValidator = () => {
        if (houseNo === '') {
            setHouseNoError("House field cannot be empty")
        }
        else {
            setHouseNoError("")
        }
    }
    const streetNoValidator = () => {
        if (streetNo === '') {
            setStreetNoError("Steet field cannot be empty")
        }
        else {
            setStreetNoError("")
        }
    }
    const nearByValidator = () => {
        if (nearBy === '') {
            setNearByError("Near field cannot be empty")
        }
        else {
            setNearByError("")
        }
    }

    const data = [
        { label: 'Computer', value: '1' },
        { label: 'Camera', value: '2' },
    ];

    const _renderItem = item => {
        return (
            <View style={{
                paddingVertical: 17,
                paddingHorizontal: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{
                    flex: 1,
                    fontSize: 16,
                }}>{item.label}</Text>
            </View>
        );
    };

    const postImages = () => {
        const data = new FormData();
        data.append('file', imageResourse);
        data.append('upload_preset', 'y1v5h9wy');
        data.append('cloud_name', 'rentbucket');

        fetch('https://api.cloudinary.com/v1_1/rentbucket/image/upload', {
            method: 'POST',
            body: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const url = data.url
                postAd(url)
            })
            .catch((err) => {
                console.log('An error has occured while uploading the image.', err);
            });
    }

    const postAd = (url) => {

        if (title && mobileNumber && category && price && description && houseNo && nearBy && streetNo != '') {
            if (mobileNumber.length === 11) {
                const data = {
                    title: title,
                    image: url,
                    category: category,
                    city: city,
                    mobileNumber: mobileNumber,
                    price: price,
                    description: description,
                    houseNo: houseNo,
                    streetNo: streetNo,
                    nearBy: nearBy
                }
                Axios.post(`https://rentbucket-server.herokuapp.com/user/postAdRequest`, data,
                    {
                        headers: {
                            'token': token
                        }
                    }
                )
                    .then((res) => {
                        console.log(res)
                        alert("Ad request send to Admin")
                        reset();
                    }).catch((error) => {
                        alert("Something went wrong")
                        console.log(error)
                    });
            }
            else {
                alert("Please Enter Valid Mobile Number")
            }
        }
        else {
            alert("Please Fill All Fields")
        }
    }

    return (
        <ScrollView scrollEnabled={true} style={{ height: '80%', marginBottom: 40 }}>
            {
                selectedImage === true ?
                    (<LinearGradient colors={['white', 'white']}
                        style={{ padding: 10, margin: 10, borderRadius: 20, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={{ uri: imageResourse.uri }} resizeMode='stretch' style={{ width: 350, height: 130, borderRadius: 20 }}
                        />
                        <TouchableOpacity onPress={() => { setSelectedImage(false) }}>
                            <View style={{ top: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>) :
                    (<LinearGradient colors={['#4682B4', '#00BFFF']}
                        style={{ padding: 20, margin: 10, borderRadius: 20, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                ImagePicker.openPicker({
                                    width: 300,
                                    height: 400,
                                    cropping: true,
                                    multiple: false
                                }).then(images => {
                                    console.log(images);
                                    const uri = images.path;
                                    const type = images.mime;
                                    const name = "ads/" + images.modificationDate;
                                    const image = {
                                        uri,
                                        type,
                                        name,
                                    };
                                    setImageResource(image)
                                    setSelectedImage(true)
                                }).catch(error => {
                                    console.log(error)
                                })
                            }}>
                            <AddImage
                                style={{ marginRight: 8 }}
                                name='addfile'
                                size={80}
                                color='white'
                            />
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginTop: 20 }}>Add Image</Text>
                        </TouchableOpacity>
                    </LinearGradient>)
            }

            <View style={{ padding: 20, backgroundColor: 'white', margin: 10, borderRadius: 20 }}>
                <View style={{}}>
                    <Text style={{ color: 'black', marginLeft: 10 }}>Title <Text style={{ color: 'red' }}>*</Text> </Text>
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
                            placeholder=""
                            onBlur={titleValidator}
                            onChangeText={(text) => { setTitle(text), titleValidator }}
                            value={title}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>{titleError}</Text>
                </View>
                <View style={{ marginTop: 10, }}>
                    <Text style={{ color: 'black', marginLeft: 10 }}>Category <Text style={{ color: 'red' }}>*</Text> </Text>
                    <Dropdown
                        style={{
                            marginTop: 8,
                            height: 55,
                            width: "95%",
                            // borderBottomWidth: 2,
                            // borderBottomColor: 'black',
                            fontSize: 16,
                            borderColor: '#ccc',
                            borderWidth: 1,
                            borderRadius: 10,
                        }}
                        placeholderStyle={{
                            // marginLeft: 5,
                            color: "white"
                        }}
                        selectedTextStyle={{
                            marginLeft: 15,
                            color: 'black'
                        }}
                        iconStyle={{
                            marginRight: 10
                        }}
                        data={data}
                        labelField="label"
                        valueField="value"
                        value={bank}
                        onChange={item => {
                            setbank(item.value);
                            setCategory(item.label);
                            console.log('selected', item);
                        }}
                        renderItem={item => _renderItem(item)}
                    />
                </View>
                <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>{categoryError}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'black', marginLeft: 10 }}>City <Text style={{ color: 'red' }}>*</Text> </Text>
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
                            placeholder=""
                            onBlur={cityValidator}
                            onChangeText={(text) => { setCity(text), cityValidator }}
                            value={city}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>{cityError}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
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
                            placeholder=""
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
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'black', marginLeft: 10 }}>Price (Per Day) <Text style={{ color: 'red' }}>*</Text> </Text>
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
                            placeholder=""
                            keyboardType="numeric"
                            onBlur={priceValidator}
                            onChangeText={(text) => { setPrice(text), priceValidator }}
                            value={price}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>{priceError}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'black', marginLeft: 10 }}>Descprition <Text style={{ color: 'red' }}>*</Text> </Text>
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
                                width: '90%',
                            }}
                            placeholder=""
                            onBlur={descriptionValidator}
                            onChangeText={(text) => { setDescription(text), descriptionValidator }}
                            value={description}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>{descriptionError}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'black', marginLeft: 10 }}>House No <Text style={{ color: 'red' }}>*</Text> </Text>
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
                            placeholder=""
                            onBlur={houseNoValidator}
                            onChangeText={(text) => { setHouseNo(text), houseNoValidator }}
                            value={houseNo}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>{houseNoError}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'black', marginLeft: 10 }}>Street <Text style={{ color: 'red' }}>*</Text> </Text>
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
                            placeholder=""
                            onBlur={streetNoValidator}
                            onChangeText={(text) => { setStreetNo(text), streetNoValidator }}
                            value={streetNo}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>{streetNoError}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'black', marginLeft: 10 }}>Near By <Text style={{ color: 'red' }}>*</Text> </Text>
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
                            placeholder=""
                            onBlur={nearByValidator}
                            onChangeText={(text) => { setNearBy(text), nearByValidator }}
                            value={nearBy}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-start', marginLeft: 30 }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>{nearByError}</Text>
                </View>
                <View style={{ marginTop: 15, alignItems: 'center', marginBottom: 15 }}>
                    <TouchableOpacity
                        onPress={() => { postImages() }}
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
                            Post Ad
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default PostAd;