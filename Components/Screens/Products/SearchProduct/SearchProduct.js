// import { SearchBar } from 'react-native-elements';
import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SearchIcon from 'react-native-vector-icons/Feather';

class SearchProduct extends React.Component {

    _isMounted = false

    state = {
        search: '',
        result: '',
        loader: false,
    };
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    updateSearch = (search) => {
        this.setState({ search });
        this.fetchPostSearchNews(search);
    };

    async fetchPostSearchNews(search) {
        // const { search } = this.props.route;
        // this._isMounted = true;
        this.setState({ loader: true })
        console.log(search);
        try {
            let resp = await fetch(`http://10.0.2.2:5000/user/searchProduct/${this.state.search}`)
            let respJson = await resp.json();
            if (this._isMounted) {
                this.setState({
                    result: respJson,
                    loader: false
                })
                console.log(this.state.result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    ShowNews() {
        var views;
        if (this.state.result.length > 0) {
            views = this.state.result.map((x) =>
                // <View key={x._id} style={{  backgroundColor: 'white', marginBottom: 5, marginTop: 5 }}>
                <TouchableOpacity key={x._id} style={{ shadowOffset: { width: 5, height: 5 }, elevation: 5, backgroundColor: '#ffffff', shadowOpacity: 0.20, shadowRadius: 1.41, shadowColor: '#000', marginLeft: 20, marginRight: 20, marginBottom: 10, marginTop: 10 }} onPress={() => this.props.navigation.navigate("ProductDetails", { paramKey: x })}>
                    <View style={{ padding: 10, flexDirection: 'row', }}>
                        <View style={{ flex: 1 }}>
                            <Image source={{ uri: x.image }} resizeMode='stretch' style={{ flex: 1 }} />
                        </View>
                        <View style={{ padding: 10, width: '72%', justifyContent: 'space-around', backgroundColor: 'white' }}>
                            <View style={{ marginLeft: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text style={{ fontSize: 16, fontWeight: '700', color: 'black' }}>{x.title}</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: 'grey', width: '95%', alignSelf: 'center' }} />
                            <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 12, fontWeight: '700', color: 'black' }}>{x.mobileNumber}</Text>
                                <Text style={{ fontSize: 12, fontWeight: '700', color: 'black' }}>Rs.{x.price}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                // </View>
            )
            return views;
        }
    }

    NoResult() {
        var viewss;
        if (this.state.result && this.state.result.length == 0) {
            viewss =
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 160, fontWeight: 'bold', color: '#939598' }}>
                        NO RESULT FOUND
                    </Text>
                </View>
            return viewss;
        }
    }

    render() {
        const { search } = this.state;

        return (
            <View style={{ flex: 1, marginTop: 1 }}>
                <View style={{ alignItems: 'center' }}>
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
                            placeholder={'Search Here...'}
                            onChangeText={this.updateSearch}
                            value={this.state.search}
                        />
                        <SearchIcon
                            style={{ marginRight: 15, marginLeft: 8 }}
                            name='search'
                            size={18}
                            color='#8B0000'
                        />
                    </View>
                </View>
                {
                    this.state.loader ?
                        <ActivityIndicator size="large" color='maroon' />
                        : <ScrollView>
                            <View style={{ flex: 1 }}>
                                {this.ShowNews()}
                                {this.NoResult()}
                            </View>
                        </ScrollView>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    "title": {
        fontWeight: 'bold'
    }
});

export default SearchProduct;