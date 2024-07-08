import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type TimerProps = {
  onUpdate: (elapsedTime: number) => void;
};

const Timer = ({onUpdate}: TimerProps) => {
  const elapsedTimeRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      elapsedTimeRef.current += 1;
      onUpdate(elapsedTimeRef.current);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onUpdate]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        Time elapsed: {elapsedTimeRef.current} seconds
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 65,
    paddingVertical: 25,
    backgroundColor: '#975fff',
    borderRadius: 40,
    elevation: 8,
    margin: 20,
    display: 'none',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Timer;
