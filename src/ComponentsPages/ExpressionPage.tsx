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

const ExpressionPage = ({}) => {
  const route = useRoute<ExpressionPageRouteProp>();
  const {complexity1, operation, complexity2} = route.params;

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Complexity 1: {complexity1}</Text>
        <Text>Operation: {operation}</Text>
        <Text>Complexity 2: {complexity2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ebfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpressionPage;
