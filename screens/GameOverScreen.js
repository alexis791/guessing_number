import React from 'react'
import { View, StyleSheet, Button, Image, Text } from 'react-native'
import Colors from '../constants/colors'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

const GaveOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{' '}
          <Text style={styles.highligth}>{props.roundsNumber}</Text>{' '}
          rounds to guess the number{' '}
          <Text style={styles.highligth}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <Button title="NEW GAME" onPress={props.onRestart}/>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 10
  },
  image: {
    width: '100%',
    height: '100%'
  },
  highligth: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20
  }
})

export default GaveOverScreen