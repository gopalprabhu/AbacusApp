import {StyleSheet, View, ImageBackground} from 'react-native';
import StartButton from '../Components/StartButton';
import LottieView from 'lottie-react-native';
import {useEffect, useRef, useState} from 'react';

function StartPage() {
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
      }, 2500);

      // Clean up the timer
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);
  return (
    <ImageBackground
      style={styles.container}
      source={require('./../assets/Images/bkg.jpg')}>
      {showAnimation ? (
        <LottieView
          source={require('./../assets/Animation/beedsAbacus.json')}
          autoPlay
          loop={false}
          style={styles.lottie}
          ref={animationRef}
        />
      ) : (
        <StartButton screenName={'Complexity_Page'} buttonTitle="Start" />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ebfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 65,
    paddingVertical: 25,
    backgroundColor: '#975fff',
    borderRadius: 40,
    elevation: 8,
  },
  buttonPressed: {
    transform: [{translateX: 2}, {translateY: 2}],
  },
  buttonText: {
    fontSize: 23,
    color: '#fff',
    fontFamily: 'PressStart2P-Regular',
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

export default StartPage;
