import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'

const generateRandomBetween = (min, max, exclude) => {
  min= Math.ceil(min)
  max= Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max-min)) + min
  if (rndNum === exclude)
    return generateRandomBetween(min, max, exclude)
  else
    return rndNum
}

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
      <Text>#{numOfRound}</Text>
      <Text>{value}</Text>
    </View>
  )

const GameScreen = props => {
  const inititalGuess = generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(inititalGuess)
  const [pastGuesses, setPastGuesses] = useState([inititalGuess])
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const {userChoice, onGameOver } = props

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess,])

  const nextGuessHandler = direction => {
    if(
      (direction === 'lower' && currentGuess < props.userChoice) || 
      (direction === 'greater' && currentGuess > props.userChoice)){
      Alert.alert('Don\'t lie!','You know that this is wrong...',[
        {text: 'sorry', style:'cancel'}
      ])
      return
    }

    if(direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    )
    setCurrentGuess(nextNumber)
    // setRounds(currentRounds => currentRounds + 1)
    setPastGuesses(currentPastGuesses => [nextNumber,...currentPastGuesses])
  }

  return(
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler('lower')}>
          <Ionicons name="md-remove" size={24} color='white'/>
        </MainButton>
        <MainButton onPress={() => nextGuessHandler('greater')}>
          <Ionicons name="md-add" size={24} color='white'/>
        </MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView>
            {pastGuesses.map( (guess, index) => renderListItem(guess, pastGuesses.length - index) )}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%'
  },
  listItem: {
    borderColor: 'black',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  list: {
    width: '80%',
    flex: 1
  }
})

export default GameScreen