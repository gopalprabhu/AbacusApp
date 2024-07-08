import {StyleSheet, View, Text, Button} from 'react-native';
import StartButton from '../Components/StartButton';
import LottieView from 'lottie-react-native';
import {useEffect, useRef, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  HighScore_Page: {
    correctCount: number;
    timeElapsed: number;
  };
};

type HighScorePageRouteProp = RouteProp<RootStackParamList, 'HighScore_Page'>;

function HighScorePage() {
  const route = useRoute<HighScorePageRouteProp>();
  const {correctCount, timeElapsed} = route.params;

  const [highScore, setHighScore] = useState(0);

  const animationRef = useRef<LottieView>(null);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const getHighScore = async () => {
      try {
        const savedHighScore = await AsyncStorage.getItem('highScore');
        if (savedHighScore !== null) {
          setHighScore(parseInt(savedHighScore, 10));
        }
      } catch (error) {
        console.error('Failed to load high score.', error);
      }
    };

    getHighScore();
  }, []);
  useEffect(() => {
    console.log('insideEffect for correctCount');
    const saveHighScore = async () => {
      if (correctCount > highScore) {
        setHighScore(correctCount);
        try {
          await AsyncStorage.setItem('highScore', correctCount.toString());
        } catch (error) {
          console.error('Failed to save high score.', error);
        }
      }
    };

    saveHighScore();
  });

  useEffect(() => {
    animationRef.current?.play(0, 100);
  }, []);

  useEffect(() => {
    if (showAnimation) {
      // Set a timer to hide the animation after it has played (e.g., 3 seconds)
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 2500); // Duration of the animation in milliseconds

      // Clean up the timer
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const resetHighScore = async () => {
    try {
      await AsyncStorage.removeItem('highScore');
      setHighScore(0);
    } catch (error) {
      console.error('Failed to reset high score.', error);
    }
  };
  return (
    <View style={styles.container}>
      {showAnimation ? (
        <LottieView
          source={require('./../assets/Animation/confettiBurst.json')}
          autoPlay
          loop={false}
          style={styles.lottie}
          ref={animationRef}
        />
      ) : (
        <View />
      )}
      <View style={styles.scoreContainer}>
        <View style={styles.highScoreContainer}>
          <Text style={styles.highScore}>High Score</Text>
          <Text style={styles.highScore}>{highScore}</Text>
        </View>
        <View style={styles.currentScoreContainer}>
          <Text style={styles.currentScore}>Score: {correctCount}</Text>
        </View>
        <Text style={[styles.currentScore, styles.time]}>
          Time: {timeElapsed} Seconds
        </Text>
      </View>
      <View style={styles.goHomeButton}>
        <StartButton screenName="Start_Page" buttonTitle="Go Home" />
      </View>
      {/* <Button title="Reset High Score" onPress={resetHighScore} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ebfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
  },
  currentScore: {
    fontSize: 34,
  },
  highScore: {
    fontSize: 44,
  },
  currentScoreContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 30,
    margin: 15,
  },
  highScoreContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  time: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 30,
    margin: 15,
  },
  goHomeButton: {
    marginBottom: 30,
  },
});

export default HighScorePage;
