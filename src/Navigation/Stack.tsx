import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import StartPage from '../ComponentsPages/StartPage';
import ComplexityPage from '../ComponentsPages/ComplexityPage';
import ExpressionPage from '../ComponentsPages/ExpressionPage';
import HighScorePage from '../ComponentsPages/HighScorePage';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Start_Page" component={StartPage} />
      <Stack.Screen name="Complexity_Page" component={ComplexityPage} />
      <Stack.Screen name="Expression_Page" component={ExpressionPage} />
      <Stack.Screen name="HighScore_Page" component={HighScorePage} />
    </Stack.Navigator>
  );
};
export default MyStack;
