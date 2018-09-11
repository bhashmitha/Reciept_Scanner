import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  ToolbarAndroid,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {Header} from 'react-native-elements';

export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loading: true,
      musicLibrary: []
    };
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.musicRow}>
        <View style={styles.MovieImage}>
          <Image
            style={{ width: 80, height: 80, borderRadius: 5 }}
            source={{ uri: "https://image.tmdb.org/t/p/w500" + item.backdrop_path }}
          />
        </View>
        <View style={{ flex: 0.6 }}>
          <View style={{ flex: 0.5 }}>
            <Text
              style={{ color: "black", fontWeight: "bold", fontSize:17}}>
              {item.title}
            </Text>
            <Text style={{fontSize:10}}
              numberOfLines={2}
              ellipsizeMode={"tail"}>
              {item.overview}
            </Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={{ color: "black" }}>{item.release_date}</Text>
            </View>
        </View>
        <TouchableOpacity 
          style={{ flex: 0.1, alignItems:'center', justifyContent: "center" }}>
          <Icon name="md-star-outline" size={25} color="black"/>
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=f9340678aa6a61a60578f56c8f272f61&language=en-US1&page=1"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          musicLibrary: responseJson.results,
          Loading: false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.musicLibrary);
    if (this.state.Loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
          <Header
            leftComponent={{
              icon: 'menu',
              color: 'white',
              onPress: () => alert('ea'),
            }}
            centerComponent={{ text: 'MUSIC LIBRARY', style: { color: 'white', fontWeight:'bold', fontSize:17 } }}
            rightComponent={{ icon: 'home', color: 'white', height:20}}
            backgroundColor="black"
            elevation={4}
            innerContainerStyles={{flexDirection: 'row', alignItems:'center'}}
            outerContainerStyles={{height:55}}
          />
        <FlatList
          data={this.state.musicLibrary}
          renderItem={this.renderItem}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  musicRow: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    borderColor: "#ccc",
    borderBottomWidth: 0.8,
    marginBottom:10,
    justifyContent: "flex-end"
  },
  MovieImage:{
    flex: 0.3, 
    alignItems: "flex-start", 
    justifyContent: "center", 
    marginBottom:15
  }
})