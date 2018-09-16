import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {Header} from 'react-native-elements';
import PropTypes from "prop-types";
import Response from './Response.json';

export default class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loading: true,
      scannedData: []
    };
  }

  renderFooter = () => {
    return (
      <View style={{flex:1, flexDirection:'row'}}>
        <View style={{flex:0.7}}>
          <Text>SubTotal</Text>
        </View>
      </View>
    );
  }

  renderHeader = () => {
    return(
      <View style={{flex:1, flexDirection: "row"}}>
        <View style={{flex:0.2}}>
          <Text style={{fontWeight:'bold'}}>Sl.no</Text>
        </View>
        <View style={{flex:0.6}}>
          <Text style={{fontWeight:'bold'}}>Item</Text>
        </View>
        <View style={{flex:0.2}}>
          <Text style={{fontWeight:'bold'}}>Price</Text>
        </View>
    </View>
    );
  }

  renderItem = ({ item }) => {
    console.log("item",item)
    return (
      <View style={{flex:1, flexDirection:'row'}}>
        <View style={{flex:0.7}}>
          <Text>{item.description}</Text>
          </View>
        <View style={{flex:0.2}}>
          <Text>{item.data}</Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
    const response = Response.lineAmounts;
      this.setState({
        scannedData: response,
        Loading: false
      });
  }

  render() {
    console.log(this.state.scannedData);
    if (this.state.Loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.scannedData}
          ListHeaderComponent = {this.renderHeader}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scanRow: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    borderColor: "#ccc",
    borderBottomWidth: 0.8,
    marginBottom:10,
    justifyContent: "flex-end"
  }
})