import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {Header} from 'react-native-elements';
import PropTypes from "prop-types";
import Response from './Response.json';


const deviceWidth = Dimensions.get("window").width;

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
      <View style={{flex:1, flexDirection:'row', padding:10}}>
        <View style={{flex:0.8, alignItems:'center'}}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Total</Text>
        </View>
        <View style={{flex:0.2}}>
          <Text>${Response.totalAmount.data}</Text>
        </View>  
      </View>
    );
  }

  renderHeader = () => {
    return(
      <View style={styles.listHeader}>
        <View style={{flex:0.2}}>
          <Text style={{fontWeight:'bold', fontSize:20}}>Sl.no</Text>
        </View>
        <View style={{flex:0.6, alignItems:'center'}}>
          <Text style={{fontWeight:'bold', fontSize:20}}>Item</Text>
        </View>
        <View style={{flex:0.2, alignItems:'center'}}>
          <Text style={{fontWeight:'bold', fontSize:20}}>Price</Text>
        </View>
    </View>
    );
  }

  renderItem = ({ item }) => {
    const lists = item.description;
    const splitItem = lists.split(" ");
    return (
      <View style={styles.scanRow}>
        <View style={{flex:0.2}}>
          <Text>{splitItem[0]}</Text>
        </View>
        <View style={{flex:0.6,alignItems:'center'}}>
          <Text>{splitItem[1]}{splitItem[2]}</Text>
        </View>
        <View style={{flex:0.2, alignItems:'center'}}>
          <Text>{splitItem[3]}</Text>
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
    borderColor: "#ccc",
    borderBottomWidth: 0.8,
    padding:15
  },
  listHeader: {
    flex:1, 
    flexDirection:'row', 
    backgroundColor:'#b0c4de',
    alignItems:'center',
    height: 45,
    padding:25
  }
})