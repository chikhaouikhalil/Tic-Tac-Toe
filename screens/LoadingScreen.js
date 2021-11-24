import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  Animated,
  BackHandler,
  Easing,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {colors, height, Icons, renderIconByValue, width} from '../Utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoadingScreen = ({navigation}) => {
  const [player1, setPlayer1] = useState({
    name: '',
    icon: 'smile',
  });
  const [player2, setPlayer2] = useState({name: '', icon: 'smileo'});

  const translateY = new Animated.Value(height);
  const openPlayers = () => {
    Animated.timing(translateY, {
      toValue: 0,
      delay: 0,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.in(),
    }).start();
  };
  const closePlayers = () => {
    Animated.timing(translateY, {
      toValue: height,
      delay: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.in(),
    }).start();
  };

  const play = () => {
    navigation.navigate('MainScreen', {
      player1: {
        ...player1,
        name: player1.name === '' ? 'Player 1' : player1.name,
      },
      player2: {
        ...player2,
        name: player2.name === '' ? 'Player 2' : player2.name,
      },
    });
    setTimeout(() => {
      closePlayers();
    }, 1000);
  };
  const exit = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/back.png')} />
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={openPlayers}>
          <Text style={styles.buttonText}>New Game</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={exit}>
          <Text style={styles.buttonText}>Exit</Text>
        </Pressable>
      </View>
      {/** set Players names and choose icons */}
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{translateY}],
          },
        ]}>
        <TouchableOpacity style={styles.closeButton} onPress={closePlayers}>
          <FontAwesome name="window-close" size={30} color={colors.white} />
        </TouchableOpacity>
        {/** Player 1 */}
        <View
          style={[
            styles.playerContainer,
            {backgroundColor: colors.red, marginTop: 60},
          ]}>
          <TextInput
            value={player1.name}
            onChangeText={val => setPlayer1({...player1, name: val})}
            style={styles.input}
            placeholder="Player 1"
            placeholderTextColor={colors.white}
          />

          <View style={styles.row}>
            {Icons.map(i => {
              let color = player1.icon === i ? colors.green : colors.lightGray;
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (player2.icon != i) {
                      setPlayer1({...player1, icon: i});
                    }
                  }}
                  key={i}
                  style={[
                    styles.iconContainer,
                    {
                      borderColor: color,
                      borderWidth: player1.icon === i ? 3 : 1,
                    },
                  ]}>
                  {renderIconByValue(i, color, player1.icon === i ? 28 : 25)}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View
          style={[styles.playerContainer, {backgroundColor: colors.secondary}]}>
          <TextInput
            value={player2.name}
            onChangeText={val => setPlayer2({...player2, name: val})}
            style={styles.input}
            placeholder="Player 2"
            placeholderTextColor={colors.white}
          />
          <View style={styles.row}>
            {Icons.map(i => {
              let color = player2.icon === i ? colors.green : colors.lightGray;
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (player1.icon != i) {
                      setPlayer2({...player2, icon: i});
                    }
                  }}
                  key={i}
                  style={[
                    styles.iconContainer,
                    {
                      borderColor: color,
                      borderWidth: player2.icon === i ? 3 : 1,
                    },
                  ]}>
                  {renderIconByValue(i, color, player2.icon === i ? 28 : 25)}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <TouchableOpacity onPress={play} style={styles.playButton}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    width: width,
    height: height,
    position: 'absolute',
    opacity: 1,
  },
  button: {
    backgroundColor: colors.white,
    alignSelf: 'center',
    width: width * 0.9,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: colors.black,
    fontFamily: 'Black',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  animatedContainer: {
    width,
    height,
    backgroundColor: colors.primary,
    position: 'absolute',
    paddingHorizontal: 15,
  },

  input: {
    backgroundColor: 'transparent',
    marginHorizontal: 30,
    marginTop: 10,
    borderBottomWidth: 0.75,
    borderColor: colors.lightGray,
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'Bold',
    color: colors.white,
    lineHeight: 20,
    textAlignVertical: 'center',
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  iconContainer: {
    borderWidth: 3,
    borderColor: colors.white,
    width: 43,
    height: 43,
    borderRadius: 8,
    marginHorizontal: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: colors.white,
    height: 45,
    position: 'absolute',
    bottom: 45,
    alignSelf: 'center',
    width: width - 50,
    borderRadius: 10,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerContainer: {
    paddingBottom: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
});
