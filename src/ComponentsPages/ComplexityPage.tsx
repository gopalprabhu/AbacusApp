import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import StartButton from '../Components/StartButton';

type StartPageProps = {
  navigation: NavigationProp<any>;
};

const ComplexityPage = ({navigation}: StartPageProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePress = () => {
    console.log('dropdown pressed');
  };

  type DropdownItem = {
    label: string;
    value: string;
  };
  const data_complexity_1: DropdownItem[] = [
    {label: '1 Digit', value: '1'},
    {label: '2 Digit', value: '2'},
    {label: '3 Digit', value: '3'},
    {label: '4 Digit', value: '4'},
    {label: '5 Digit', value: '5'},
  ];
  const data_complexity_2: DropdownItem[] = [
    {label: '1 Digit', value: '1'},
    {label: '2 Digit', value: '2'},
    {label: '3 Digit', value: '3'},
    {label: '4 Digit', value: '4'},
    {label: '5 Digit', value: '5'},
  ];
  const data_operation: DropdownItem[] = [
    {label: '+', value: '+'},
    {label: '-', value: '-'},
    {label: '*', value: '*'},
    {label: '/', value: '/'},
  ];

  const [complexity1, setComplexity1] = useState<string>('1');
  const [operation, setOperation] = useState<string>('+');
  const [complexity2, setComplexity2] = useState<string>('1');

  function startPressed() {
    navigation.navigate('Expression_Page', {
      complexity1,
      operation,
      complexity2,
    });
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require('./../assets/Images/bkg.jpg')}>
      <View>
        <Text style={styles.complexityTitle}>Select Complexity</Text>
      </View>
      <View style={styles.options}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={styles.itemContainerStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data_complexity_1}
          //search
          maxHeight={300}
          labelField="label"
          valueField="value"
          iconColor="#fff"
          placeholder="Digits"
          searchPlaceholder="Search..."
          value={complexity1}
          onChange={item => {
            setComplexity1(item.value);
          }}
        />

        <Dropdown
          style={[styles.dropdown, styles.dropdownOperation]}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.itemContainerStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data_operation}
          //search
          maxHeight={300}
          labelField="label"
          iconColor="#fff"
          valueField="value"
          placeholder=" +"
          searchPlaceholder="Search..."
          value={operation}
          onChange={item => {
            setOperation(item.value);
          }}
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={styles.itemContainerStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data_complexity_2}
          //search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Digits"
          searchPlaceholder="Search..."
          iconColor="#fff"
          value={complexity2}
          onChange={item => {
            setComplexity2(item.value);
          }}
        />
      </View>
      <View>
        <View>
          <StartButton
            screenName="Expression_Page"
            navigationParams={{complexity1, operation, complexity2}}
            buttonTitle="Start"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebfce1',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  complexityTitle: {
    fontSize: 30,
    color: '#fff',
  },
  options: {
    flexDirection: 'row',
    padding: 20,
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: '#ff00f2',
    width: 100,
    padding: 10,
    borderRadius: 5,
    elevation: 25,
    color: '#fff',
  },
  dropdownOperation: {
    width: 70,
  },
  itemContainerStyle: {
    backgroundColor: '#e1f5dc',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: '#fff',
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#3d3c3a',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#36c42b',
    paddingVertical: 25,
    paddingHorizontal: 55,
    borderRadius: 10,
    marginTop: 55,
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
  },
});

export default ComplexityPage;
