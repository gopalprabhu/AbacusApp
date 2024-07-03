import {StyleSheet, View, Text} from 'react-native';
import StartButton from '../Components/StartButton';
import LottieView from 'lottie-react-native';
import {useEffect, useRef, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';

type RootStackParamList = {
  HighScore_Page: {
    correctCount: number;
  };
};

type HighScorePageRouteProp = RouteProp<RootStackParamList, 'HighScore_Page'>;

function HighScorePage() {
  const route = useRoute<HighScorePageRouteProp>();
  const {correctCount} = route.params;

  const animationRef = useRef<LottieView>(null);
  const [showAnimation, setShowAnimation] = useState(true);

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
      <View>
        <Text>Score is:{correctCount}</Text>
      </View>
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
});

export default HighScorePage;
