import {useRoute, RouteProp} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  ExpressionPage: {
    complexity1: string | null;
    operation: string | null;
    complexity2: string | null;
  };
  HighScore_Page: {correctCount: number};
};

type ExpressionPageRouteProp = RouteProp<RootStackParamList, 'ExpressionPage'>;
type HighScorePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HighScore_Page'
>;
var counter = 0;
const ExpressionPage = () => {
  const navigation = useNavigation<HighScorePageNavigationProp>();
  const route = useRoute<ExpressionPageRouteProp>();
  const {complexity1, operation, complexity2} = route.params;

  //for no re-render - update bgColor
  const expressionAndButtonRef = useRef<View>(null);

  const generateRandomNumber = (digits: number): number => {
    const min = digits === 1 ? 0 : Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  //Keep Track of Correct and Wrong Answers
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const handlePressOne = (number: number) => {
    if (number == expressionResult) {
      if (expressionAndButtonRef.current) {
        expressionAndButtonRef.current.setNativeProps({
          style: {backgroundColor: '#34a832'},
        });
      }
      setTimeout(() => {
        if (expressionAndButtonRef.current) {
          expressionAndButtonRef.current.setNativeProps({
            style: {backgroundColor: '#bf65f0'},
          });
        }
        const newCorrectCount = correctCount + 1;
        setCorrectCount(newCorrectCount);
        counter = counter + 1;
        console.log('Correct Option, Correct till now:', correctCount + 1);
        var finalValue = correctCount + 1;
        if (counter == 5) {
          counter = 0;
          navigation.navigate('HighScore_Page', {
            correctCount: newCorrectCount,
          });
        }
      }, 100);
    } else {
      if (expressionAndButtonRef.current) {
        expressionAndButtonRef.current.setNativeProps({
          style: {backgroundColor: 'red'},
        });
      }
      setTimeout(() => {
        if (expressionAndButtonRef.current) {
          expressionAndButtonRef.current.setNativeProps({
            style: {backgroundColor: '#bf65f0'},
          });
        }
        setWrongCount(wrongCount + 1);
        counter = counter + 1;
        console.log('Wrong Option, Wrong till now:', wrongCount + 1);
        if (counter == 5) {
          counter = 0;
          navigation.navigate('HighScore_Page', {correctCount});
        }
      }, 100);
    }
  };

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
    let numDigits = Math.floor(Math.log10(Math.abs(expressionResult))) + 1;

    // Determine the range based on the number of digits
    let range = Math.pow(10, numDigits - 1);

    // Generate a random number within the determined range
    let offset = Math.floor(Math.random() * (2 * range + 1)) - range;

    // Create fakeAbc by adding the offset to abc
    var fakeResult = expressionResult + offset;
    if (fakeResult == expressionResult) {
      fakeResult = fakeResult + 1;
    }

    return fakeResult;
  }

  var fakeExpressionResult = generateFakeResult(expressionResult);
  var renderTouchable1 = Math.random() < 0.5;

  return (
    <View style={styles.container}>
      <View
        ref={expressionAndButtonRef}
        style={[styles.container, styles.expressionAndButton]}>
        <Text style={styles.expressionText}>{expression}</Text>
        <View style={styles.buttonConatiner}>
          {renderTouchable1 ? (
            <View style={styles.buttonContainerEach}>
              <TouchableWithoutFeedback
                onPress={() => handlePressOne(expressionResult)}>
                <View style={styles.buttonContainerTextPadding}>
                  <Text
                    style={[
                      styles.buttonTextEach,
                      {fontSize: getDynamicFontSize(String(expressionResult))},
                    ]}>
                    {expressionResult}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <View style={styles.buttonContainerEach}>
              <TouchableWithoutFeedback
                onPress={() => handlePressOne(fakeExpressionResult)}>
                <View style={styles.buttonContainerTextPadding}>
                  <Text
                    style={[
                      styles.buttonTextEach,
                      {
                        fontSize: getDynamicFontSize(
                          String(fakeExpressionResult),
                        ),
                      },
                    ]}>
                    {fakeExpressionResult}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
          {!renderTouchable1 ? (
            <View style={styles.buttonContainerEach}>
              <TouchableWithoutFeedback
                onPress={() => handlePressOne(expressionResult)}>
                <View style={styles.buttonContainerTextPadding}>
                  <Text
                    style={[
                      styles.buttonTextEach,
                      {fontSize: getDynamicFontSize(String(expressionResult))},
                    ]}>
                    {expressionResult}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <View style={styles.buttonContainerEach}>
              <TouchableWithoutFeedback
                onPress={() => handlePressOne(fakeExpressionResult)}>
                <View style={styles.buttonContainerTextPadding}>
                  <Text
                    style={[
                      styles.buttonTextEach,
                      {
                        fontSize: getDynamicFontSize(
                          String(fakeExpressionResult),
                        ),
                      },
                    ]}>
                    {fakeExpressionResult}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
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
  buttonContainerEach: {
    margin: 8,
    marginBottom: 15,
    backgroundColor: '#500778',
    //paddingVertical: 55,
    borderRadius: 8,
    width: '44%',
    alignItems: 'center',
  },
  buttonTextEach: {
    color: '#f6edfa',
  },
  buttonContainerTextPadding: {
    paddingVertical: 55,
    alignItems: 'center',
    paddingHorizontal: 35,
  },
});

export default ExpressionPage;
