import React, {Component} from 'react';
import { View,Text,ScrollView} from 'react-native';
import PropTypes from "prop-types";

export default class ResponseText extends React.Component {
    render(){
        return(
            <View>
                <ScrollView>
                    <Text>hello</Text>
                </ScrollView>
            </View>
        );
    }
}