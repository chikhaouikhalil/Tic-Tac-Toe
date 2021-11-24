import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {View, Text, StyleSheet} from 'react-native';

export const {width, height} = Dimensions.get('window');

export const colors = {
  primary: '#db6663',
  red: '#a10d37',
  secondary: '#4980c9',
  green: '#c4faac',
  darkGreen: '#3b6628',
  white: '#ffffff',
  lightGray: '#eeeeee',
  black: '#242424',
};

export const Icons = [
  'smile',
  'smileo',
  'heart',
  'hearto',
  'circle',
  'dot-circle-o',
  'star',
  'staro',
  'triangle',
  'triangleo',
  'sun',
  'certificate',
  'bullseye',
  'snowflakeo',
  'superpowers',
];

export const renderIconByValue = (val, c, s) => {
  const color = c || colors.white;
  const size = s || 25;
  switch (val) {
    case 'circle':
      return <Entypo name="circle" color={color} size={size} />;
    case 'dot-circle-o':
      return <FontAwesome name="circle" color={color} size={size} />;
    case 'certificate':
      return <FontAwesome name="certificate" color={color} size={size} />;
    case 'snowflakeo':
      return <FontAwesome name="snowflake-o" color={color} size={size} />;
    case 'superpowers':
      return <FontAwesome name="superpowers" color={color} size={size} />;
    case 'bullseye':
      return <FontAwesome name="bullseye" color={color} size={size} />;
    case 'heart':
      return <AntDesign name="heart" color={color} size={size} />;
    case 'hearto':
      return <AntDesign name="hearto" color={color} size={size} />;
    case 'star':
      return <AntDesign name="star" color={color} size={size} />;
    case 'staro':
      return <AntDesign name="staro" color={color} size={size} />;
    case 'triangle':
      return <Ionicons name="triangle" color={color} size={size} />;
    case 'triangleo':
      return <Ionicons name="triangle-outline" color={color} size={size} />;
    case 'smile':
      return <Fontisto name="slightly-smile" color={color} size={size} />;
    case 'smileo':
      return <Fontisto name="smiley" color={color} size={size} />;
    case 'sun':
      return <FontAwesome5 name="sun" color={color} size={size} />;
    default:
      return null;
  }
};

export const Header = ({navigation, text, reset}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{padding: 7.5, paddingLeft: 10}}>
        <MaterialCommunityIcons
          size={30}
          color={colors.white}
          name="exit-run"
        />
      </TouchableOpacity>
      <Text style={styles.score}>{text}</Text>
      <TouchableOpacity
        onPress={reset}
        style={{padding: 7.5, paddingRight: 10}}>
        <MaterialCommunityIcons size={30} color={colors.white} name="replay" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    width,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  score: {
    fontSize: 18,
    color: colors.white,
    fontFamily: 'Black',
  },
});
