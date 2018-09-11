// 'use strict';
// import React, {Component} from 'react';
// import { Platform, StyleSheet, View, TouchableOpacity,Text, ScrollView} from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import {create} from 'apisauce';
// import ResponseText from './ResponseText';

// export default class Camera extends Component {
//   constructor()
//   {
//     super();
//     this.state = {
//       data: null,
//       path: true
//     };
//   }
//     uploadPost = (data) => {
//         const api = create({
//             baseURL: 'https://api.taggun.io/api/receipt/v1/verbose/file',
//             headers: {
//             "Content-Type": "multipart/form-data",
//             Accept: "application/json",
//             apikey: "0c481c00a21711e8b187f3e9d1401099"
//         }
//     });
//     let apikey =  "0c481c00a21711e8b187f3e9d1401099";
//     var source = data;
//     if (Platform.OS === 'ios') {
//        // source is same
//     } else {
//        //source = 'file://' + data  
//        //source = data                 
//     }
//     var image = {
//         uri:  source,
//         type: 'image/jpeg',
//         name: 'photo',
//     };

//     var body = new FormData();
//     //body.append('apikey', apikey);
//     body.append('file',image);
//     let url = 'post?api_version=1';
//     console.log(body,"hello");
//     //return api.post(api.url, body).then((res) => console.log('success:' + res.ok ));
//   fetch('https://api.taggun.io/api/receipt/v1/verbose/file', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//           apikey: "0c481c00a21711e8b187f3e9d1401099"  
//         },
//         body: body,
//     })
//     .then((Response) => {console.log(Response)
//     this.setState({ path: false })})
//     .catch((err) => console.log(err));
//   }

  
// 	render(){
//     if(this.state.path == false)
//     {
//       return <ResponseText onChange = {this.state.data} />;
//     }
// 		return(
// 			<View style={styles.container}>
//         <RNCamera
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={RNCamera.Constants.FlashMode.auto}
//           permissionDialogTitle={'Permission to use camera'}
//           permissionDialogMessage={'We need your permission to use your camera phone'}
          
//         >
//           {({ camera, status }) => {
//             return (
//               <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//                 <TouchableOpacity onPress={() =>{this.takePicture(camera)}} style={styles.capture}>
//                   <Text style={{ fontSize: 14 }}> Capture </Text>
//                 </TouchableOpacity>
                
//               </View>
//             );
//           }}
//         </RNCamera>
//       </View>
// 		);
// 	}
//   takePicture = async function(camera) {
//     const options = { quality: 0.5, base64: true };
//     const data = await camera.takePictureAsync(options);
//     const imageUrl = this.uploadPost(data.uri);
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });