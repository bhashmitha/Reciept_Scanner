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
import {Header} from 'react-native-elements';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: true,
      // photo: true
    };
  }

  cameraProp() {
    this.setState({status: true});
  }

  // galleryProp() {
  //   this.setState({photo: true});
  // }
 
  openCamera =() => {
    this.setState({status:false});
  };

  // openGallery =() =>{
  //   this.setState({photo:false});
  // }

  render() {
    if(this.state.status == false){
      return <Camera onChange={this.cameraProp} />;
    } 
    // if(this.state.photo == false){
    //   return <Gallery onChange={this.galleryProp} />;
    // }
    return(
      <View style={{flex:1}}>
        <Header
          centerComponent={{ text: 'RETURN TODAY', style: { color: '#fff', fontWeight:'bold', fontSize:20}}}
          backgroundColor="#3D6DCC"
          elevation={4}
          innerContainerStyles={{flexDirection: 'row', alignItems:'center'}}
          outerContainerStyles={{height:55}}
        />
        <View style={styles.container}>
         <Gallery />
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
