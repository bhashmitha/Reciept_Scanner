import React, {Component} from 'react';
import { Platform, View,Text, Image, StyleSheet, Button} from 'react-native';
import ImagePicker from "react-native-image-picker";
import {create} from 'apisauce';

export default class Gallery extends React.Component {
  uploadPost = (data) => {
    const api = create({
      baseURL: 'https://api.taggun.io/api/receipt/v1/verbose/file',
      headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      apikey: "0c481c00a21711e8b187f3e9d1401099"
      }
    });
    let apikey =  "0c481c00a21711e8b187f3e9d1401099";
    var source = data;
    if (Platform.OS === 'ios') {
      // source is same
    } else {
      //source = 'file://' + data  
      //source = data                 
    }
    var image = {
      uri:  source,
      type: 'image/jpeg',
      name: 'photo',
    };

    var body = new FormData();
    //body.append('apikey', apikey);
    body.append('file',image);
    let url = 'post?api_version=1';
    console.log(body,"hello");
    //return api.post(api.url, body).then((res) => console.log('success:' + res.ok ));
    fetch('https://api.taggun.io/api/receipt/v1/verbose/file', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        apikey: "0c481c00a21711e8b187f3e9d1401099"  
      },
      body: body,
    })
    .then(response => response.json())
    .then(responseJson => { console.log("response",JSON.stringify(responseJson))
    })
    .catch(err => console.log(err));
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Scan Reciept", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
        this.uploadPost(res.uri);
      }
    });
  }

  render() {
    return(
      <View style={styles.button}>
        
        <Button title="Scan Reciept" onPress={this.pickImageHandler} />
      </View>
        
             
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "80%",
    marginTop:20,
    flexDirection:"row",
    justifyContent: "space-around"
  }
});