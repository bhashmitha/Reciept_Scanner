import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  PermissionsAndroid
} from "react-native";
import Camera from "./component/index.js";
import Gallery from "./component/Gallery/index.js";
import { Header } from "react-native-elements";
const API_TOKEN =
  "ZGFnMR4krQEhVU8Uh0ImiVP4mRAEK5ycyP0LAx7WXN45X3Grx1KJ9ldgGpj70Qbj";

const API_URL = "https://api.tabscanner.com";
//Newly created
// const API_TOKEN =
//   "PgAXNNq828LSnHrVeD2gPoyYRPQxWTrzBx7UFfpT83PORCpYh973gvj7R2BqLghC";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      receipts: [],
      isLoading: false,
      totalAmount: ""
    };
  }

  uploadPost = data => {
    console.log(data, "data");
    this.setState({ isLoading: true, status: true });

    var image = {
      // uri: "file://" + data,
      uri: data,
      type: "image/jpeg",
      name: "photo"
    };
    console.log(image, "image##@@@@@");
    var body = new FormData();
    body.append("file", image);
    fetch(`${API_URL}/${API_TOKEN}/process`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: body
    })
      .then(res => {
        console.log(res, "ress##@@@");
        res.json();
      })
      .then(response => {
        console.log(response, "POST response");
        this.setState(
          {
            token: response.token
          },
          () => this.beginPollingForProcessedDocument(response.token)
        );
      })
      .catch(err => console.log(err));
  };

  beginPollingForProcessedDocument = resToken => {
    console.log(resToken, "resToken@@@@@");
    this.pollingInterval = setInterval(
      () => this.getReceiptInfo(resToken),
      3000
    );
  };

  getReceiptInfo(resToken) {
    fetch(`${API_URL}/${API_TOKEN}/result/${resToken}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response, "GET response");
        if (response.status == "done") {
          this.handleGetDocumentSuccess(response.result);
        }
      })
      .catch(err => console.log(err));
  }
  handleGetDocumentSuccess = result => {
    clearInterval(this.pollingInterval);

    this.setState({
      status: true,
      receipts: result.lineItems,
      isLoading: false,
      totalAmount: result.total
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{
            text: "RETURN TODAY",
            style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
          }}
          backgroundColor="#3D6DCC"
          elevation={4}
          innerContainerStyles={{ flexDirection: "row", alignItems: "center" }}
          outerContainerStyles={{ height: 55 }}
        />
        {this.renderContent()}
        <Text style={{ textAlign: "right", margin: 10 }}>v0.02</Text>
      </View>
    );
  }
  renderContent() {
    if (this.state.status == false) {
      return <Camera onChange={this.cameraProp} uploadPost={this.uploadPost} />;
    } else if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={"#3D6DCC"} />
          <Text style={styles.loadingTxt}>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Gallery
          receipts={this.state.receipts}
          totalAmount={this.state.totalAmount}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  scanButton: {
    backgroundColor: "#14AED5",
    width: "40%",
    height: 40,
    alignItems: "center",
    padding: 10
  },
  loadingTxt: {
    fontSize: 14,
    color: "#000"
  }
});
