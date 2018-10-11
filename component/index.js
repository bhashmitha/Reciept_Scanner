"use strict";
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  PermissionsAndroid
} from "react-native";
import { RNCamera } from "react-native-camera";
import ImagePicker from "react-native-image-picker";

export default class Camera extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      path: true
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              this.chooseFromGallery();
            }}
            style={styles.capture}
          >
            <Text style={styles.btnTxt}>
              Choose from {"\n"}
              <Text>Gallery</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.captureImage();
            }}
            style={styles.capture}
          >
            <Text style={styles.btnTxt}>Capture</Text>
          </TouchableOpacity>
        </View>

        {/* <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        >
          {({ camera, status }) => {
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.takePicture(camera);
                  }}
                  style={styles.capture}
                >
                  <Text style={{ fontSize: 14 }}>Capture</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera> */}
      </View>
    );
  }
  formOptions() {
    return {
      // title: "Select Avatar",
      // customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
  }
  chooseFromGallery() {
    const options = this.formOptions();
    ImagePicker.launchImageLibrary(options, response => {
      // const source = { uri: "data:image/jpeg;base64," + response.data };
      console.log(response, "Img response");
      this.props.uploadPost(response.uri);
    });
  }
  captureImage() {
    const options = this.formOptions();
    ImagePicker.launchCamera(options, response => {
      this.props.uploadPost(response.uri);
    });
  }
  // takePicture = async function(camera) {
  //   const options = { quality: 0.5, base64: true };
  //   const data = await camera.takePictureAsync(options);
  //   console.log(data, "data@@$$$@");
  //   this.props.uploadPost(data.uri);
  // };
}
const center = {
  alignItems: "center",
  justifyContent: "center"
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    ...center
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  },
  capture: {
    flex: 1,
    backgroundColor: "#3D6DCC",
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    ...center
  }
});
