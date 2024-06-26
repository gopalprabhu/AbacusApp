import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import StartButton from '../Components/StartButton';

type StartPageProps = {
  navigation: NavigationProp<any>;
};

function StartPage({navigation}: StartPageProps) {
  return (
    <View style={styles.container}>
      <StartButton screenName={'Complexity_Page'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ebfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 65,
    paddingVertical: 25,
    backgroundColor: '#975fff',
    borderRadius: 40,
    elevation: 8,
  },
  buttonPressed: {
    transform: [{translateX: 2}, {translateY: 2}],
  },
  buttonText: {
    fontSize: 23,
    color: '#fff',
    fontFamily: 'PressStart2P-Regular',
  },
});

export default StartPage;
