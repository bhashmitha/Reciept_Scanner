/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
//import CameraButton from './component/CameraButton/index.js';
import Camera from './component/index.js';
import ResponseText from './component/ResponseText/index.js';
import Gallery from './component/Gallery/index.js';
import Title from './component/Title.js';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: true,
      photo: true
    };
  }

  cameraProp() {
    this.setState({status: true});
  }

  galleryProp() {
    this.setState({photo: true});
  }
 
  openCamera =() => {
    this.setState({status:false});
  };

  openGallery =() =>{
    this.setState({photo:false});
  }

  render() {
    if(this.state.status == false){
      return <Camera onChange={this.cameraProp} />;
    } 
    if(this.state.photo == false){
      return <Gallery onChange={this.galleryProp} />;
    }
    return(
      <View style={{flex:1}}>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.openCamera}
            style={styles.scanButton}>
            <Text style={{color:'white'}}>Scan Reciept</Text> 
          </TouchableOpacity>
          <TouchableOpacity onPress={this.openGallery}
            style={styles.scanButton}>
            <Text style={{color:'white'}}>Pick from gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  scanButton: {
    backgroundColor:"#14AED5",
    width: '40%',
    height: 40,
    alignItems: 'center',
    padding: 10
  }
});
