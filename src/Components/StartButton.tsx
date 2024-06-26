import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

type StartButtonProps = {
  screenName: string;
  navigationParams?: {
    [key: string]: any;
  };
};

function StartButton({screenName, navigationParams}: StartButtonProps) {
  const navigation = useNavigation<NavigationProp>();

  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    if (navigationParams) {
      navigation.navigate(screenName, navigationParams);
    } else {
      navigation.navigate(screenName);
    }
  };
  return (
    <View style={[styles.button, isPressed && styles.buttonPressed]}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default StartButton;
