import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable, Alert, Image} from 'react-native';
import MakeItRain from '../MakeItRain';
import {colors, Header, renderIconByValue, width, height} from '../Utils';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';

const MainScreen = ({navigation, route}) => {
  const {player1, player2} = route.params;

  const initGameState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  // STATUS GAME
  const [gameState, setGameState] = useState(initGameState);
  //PLAYERS 1  VS -1
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [weHaveWinner, setWeHaveWinner] = useState(false);
  const [draw, setDraw] = useState(false);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const reset = () => {
    setScore1(0);
    setScore2(0);
    setWeHaveWinner(null);
    setDraw(false);
    setGameState(initGameState);
    setCurrentPlayer(1);
  };

  const renderIcon = (row, col) => {
    var value = gameState[row][col];
    switch (value) {
      case 1:
        return renderIconByValue(player1.icon, colors.red, width / 3.2 - 70);
      case -1:
        return renderIconByValue(
          player2.icon,
          colors.secondary,
          width / 3.2 - 70,
        );
      default:
        return <></>;
    }
  };

  // Returns 1 if player 1 won , -1 if plater 2 won and 0 if no one has won.
  const getWinner = () => {
    if (
      gameState[0].includes(0) === false &&
      gameState[1].includes(0) === false &&
      gameState[2].includes(0) === false
    ) {
      setGameState(initGameState);
      setCurrentPlayer(1);
      setDraw(true);
      return;
    }

    const NUM_TILES = 3;

    var sum;
    // check rows
    for (var i = 0; i < NUM_TILES; i++) {
      sum = gameState[i][0] + gameState[i][1] + gameState[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // check col
    for (var i = 0; i < NUM_TILES; i++) {
      sum = gameState[0][i] + gameState[1][i] + gameState[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }
    // check diagonals

    sum = gameState[0][0] + gameState[1][1] + gameState[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = gameState[2][0] + gameState[1][1] + gameState[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    // NO WINNERS
    return 0;
  };

  const onTilePress = (row, col) => {
    setDraw(false);
    setWeHaveWinner(null);
    // DONT ALLOWS TILES TO CHANGE
    var value = gameState[row][col];
    if (value === 0) {
      var arr = gameState.slice();
      arr[row][col] = currentPlayer;
      setGameState(arr);
      setCurrentPlayer(currentPlayer === 1 ? -1 : 1);
    }
    // Check for winners
    const winner = getWinner();
    if (winner === 1) {
      setScore1(score1 + 1);
      setGameState(initGameState);
      setWeHaveWinner(1);
      setCurrentPlayer(1);
    }
    if (winner === -1) {
      setScore2(score2 + 1);
      setGameState(initGameState);
      setWeHaveWinner(-1);
      setCurrentPlayer(1);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/background.png')}
        style={{width, height, position: 'absolute', opacity: 0.8}}
      />
      {weHaveWinner && <MakeItRain winner={currentPlayer} />}
      <Header
        navigation={navigation}
        text={`${score1} : ${score2}`}
        reset={reset}
      />

      <Pressable
        onPress={() => {
          setWeHaveWinner(false);
          setDraw(false);
        }}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {draw && (
          <Animatable.View
            animation="tada"
            iterationCount="infinite"
            useNativeDriver={true}
            duration={1500}
            delay={0}
            iterationDelay={0}
            easing="linear"
            style={styles.alertContainer}>
            <Text style={[styles.alertText, {color: colors.darkGreen}]}>
              Draw, Good Game
            </Text>
          </Animatable.View>
        )}

        <View style={styles.line}>
          <Pressable
            onPress={() => onTilePress(0, 0)}
            style={[
              styles.tile,
              {borderLeftWidth: 0, borderTopWidth: 0, borderTopLeftRadius: 30},
            ]}>
            {renderIcon(0, 0)}
          </Pressable>
          <Pressable
            onPress={() => onTilePress(0, 1)}
            style={[styles.tile, {borderTopWidth: 0}]}>
            {renderIcon(0, 1)}
          </Pressable>
          <Pressable
            onPress={() => onTilePress(0, 2)}
            style={[
              styles.tile,
              {
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderTopRightRadius: 30,
              },
            ]}>
            {renderIcon(0, 2)}
          </Pressable>
        </View>
        <View style={styles.line}>
          <Pressable
            onPress={() => onTilePress(1, 0)}
            style={[styles.tile, {borderLeftWidth: 0}]}>
            {renderIcon(1, 0)}
          </Pressable>
          <Pressable
            onPress={() => onTilePress(1, 1)}
            style={[styles.tile, {}]}>
            {renderIcon(1, 1)}
          </Pressable>
          <Pressable
            onPress={() => onTilePress(1, 2)}
            style={[styles.tile, {borderRightWidth: 0}]}>
            {renderIcon(1, 2)}
          </Pressable>
        </View>
        <View style={styles.line}>
          <Pressable
            onPress={() => onTilePress(2, 0)}
            style={[
              styles.tile,
              {
                borderBottomWidth: 0,
                borderLeftWidth: 0,
                borderBottomLeftRadius: 30,
              },
            ]}>
            {renderIcon(2, 0)}
          </Pressable>
          <Pressable
            onPress={() => onTilePress(2, 1)}
            style={[styles.tile, {borderBottomWidth: 0}]}>
            {renderIcon(2, 1)}
          </Pressable>
          <Pressable
            onPress={() => onTilePress(2, 2)}
            style={[
              styles.tile,
              {
                borderBottomWidth: 0,
                borderRightWidth: 0,
                borderBottomRightRadius: 30,
              },
            ]}>
            {renderIcon(2, 2)}
          </Pressable>
        </View>
      </Pressable>
      {/** players */}

      <View style={styles.playersContainer}>
        {/** P1 */}
        <View style={styles.p1}>
          {renderIconByValue(player1.icon, colors.white, 18)}
          <Text numberOfLines={1} style={[styles.name, {color: colors.white}]}>
            {player1.name}
          </Text>
        </View>

        {/** P2 */}
        <View style={styles.p2}>
          {renderIconByValue(player2.icon, colors.white, 18)}
          <Text numberOfLines={1} style={[styles.name, {color: colors.white}]}>
            {player2.name}
          </Text>
        </View>
      </View>
      {weHaveWinner === 1 && (
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          useNativeDriver={true}
          duration={1500}
          delay={0}
          iterationDelay={0}
          easing="linear"
          style={[styles.alertContainer]}>
          <Entypo name="trophy" size={22} color="#eca400" />
          <Text style={styles.alertText}>Winner</Text>
          <Entypo name="trophy" size={22} color="#eca400" />
        </Animatable.View>
      )}
      {weHaveWinner === -1 && (
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          useNativeDriver={true}
          duration={1500}
          delay={0}
          iterationDelay={0}
          easing="linear"
          style={[styles.alertContainer, {alignSelf: 'flex-end'}]}>
          <Entypo name="trophy" size={22} color="#eca400" />
          <Text style={styles.alertText}>Winner</Text>
          <Entypo name="trophy" size={22} color="#eca400" />
        </Animatable.View>
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  tile: {
    backgroundColor: colors.white,
    width: width / 3.2 - 20,
    height: width / 3.2 - 20,
    alignItems: 'center',
    margin: 4,
    elevation: 20,
    justifyContent: 'center',
    shadowColor: '#381e1b',
  },
  text: {
    fontSize: 40,
  },
  name: {
    fontFamily: 'Bold',
    fontSize: 17,
    paddingLeft: 5,
  },
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    height: 45,
  },
  p1: {
    width: width * 0.5,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 45,
  },
  p2: {
    width: width * 0.5,
    alignItems: 'center',
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    flexDirection: 'row',
    height: 45,
  },
  line: {
    flexDirection: 'row',
  },
  alertContainer: {
    width: width * 0.5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 45,
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#fff',
  },
  alertText: {
    color: '#eca400',
    fontFamily: 'Bold',
    textAlign: 'center',
    fontSize: 17,
    marginHorizontal: 3,
  },
});
