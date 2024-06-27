import {
  NavigationContainer,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  ExpressionPage: {
    complexity1: string | null;
    operation: string | null;
    complexity2: string | null;
  };
};

type ExpressionPageRouteProp = RouteProp<RootStackParamList, 'ExpressionPage'>;

const ExpressionPage = () => {
  const route = useRoute<ExpressionPageRouteProp>();
  const {complexity1, operation, complexity2} = route.params;

  const generateRandomNumber = (digits: number): number => {
    const min = digits === 1 ? 0 : Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handlePressOne = () => {};

  const getExpression = (
    complexity1: string | null,
    operation: string | null,
    complexity2: string | null,
  ): string => {
    if (!complexity1 || !operation || !complexity2) {
      return 'Invalid parameters';
    }

    var num1 = generateRandomNumber(parseInt(complexity1));
    var num2 = generateRandomNumber(parseInt(complexity2));

    return `${num1} ${operation} ${num2}`;
  };

  const expression = getExpression(complexity1, operation, complexity2);
  const [num1, o, num2] = expression.split(' ');

  const calculateResult = (
    num1: number,
    num2: number,
    operation: string,
  ): number => {
    switch (operation) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
      default:
        return NaN;
    }
  };

  const getDynamicFontSize = (text: string) => {
    const baseFontSize = 29;
    const maxLength = 6;
    const scaleFactor = 3;

    if (text.length > maxLength) {
      return baseFontSize - (text.length - maxLength) * scaleFactor;
    }
    return baseFontSize;
  };
  const expressionResult = calculateResult(
    Number(num1),
    Number(num2),
    String(operation),
  );

  function generateFakeResult(expressionResult: number) {
    // Calculate the number of digits in abc
    let numDigits = Math.floor(Math.log10(expressionResult)) + 1;

    // Determine the range based on the number of digits
    let range = Math.pow(10, numDigits - 1);

    // Generate a random number within the determined range
    let offset = Math.floor(Math.random() * (2 * range + 1)) - range;

    // Create fakeAbc by adding the offset to abc
    var fakeResult = expressionResult + offset;

    return fakeResult;
  }

  var fakeExpressionResult = generateFakeResult(expressionResult);

  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.expressionAndButton]}>
        <Text style={styles.expressionText}>{expression}</Text>
        <View style={styles.buttonConatiner}>
          <View style={styles.buttonConatinerEach}>
            <TouchableWithoutFeedback onPress={handlePressOne}>
              <Text
                style={[
                  styles.buttonTextEach,
                  {fontSize: getDynamicFontSize(String(expressionResult))},
                ]}>
                {expressionResult}
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonConatinerEach}>
            <TouchableWithoutFeedback>
              <Text
                style={[
                  styles.buttonTextEach,
                  {fontSize: getDynamicFontSize(String(expressionResult))},
                ]}>
                {fakeExpressionResult}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2b6fa',
    alignItems: 'center',
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  expressionAndButton: {
    backgroundColor: '#bf65f0',
    borderRadius: 20,
    marginBottom: 20,
    elevation: 15,
    shadowColor: '#000',
  },
  expressionText: {
    fontSize: 50,
    color: '#f6edfa',
    marginTop: 100,
  },
  buttonConatiner: {
    flexDirection: 'row',
  },
  buttonConatinerEach: {
    margin: 8,
    marginBottom: 15,
    backgroundColor: '#500778',
    paddingHorizontal: 35,
    paddingVertical: 55,
    borderRadius: 8,
    width: '44%',
    alignItems: 'center',
  },
  buttonTextEach: {
    color: '#f6edfa',
  },
});

export default ExpressionPage;
