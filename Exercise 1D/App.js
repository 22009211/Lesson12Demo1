import React,{useState, useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import { Barometer } from 'expo-sensors';

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
        marginTop: 15,
    },
});

export default function App() {

    const [{ pressure, relativeAltitude }, setData] = useState({ pressure: 0, relativeAltitude: 0 });
    const [subscription, setSubscription] = useState(null);

    const toggleListener = () => {
        subscription ? unsubscribe() : subscribe();
    };

    const subscribe = () => {
        setSubscription(Barometer.addListener(setData));
    };

    const unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

  return (
    <View>
      <StatusBar/>
      <Text>Pressure: {pressure}</Text>
      <Text>Relative Altitude: {relativeAltitude}</Text>
        <Text></Text>
        <TouchableOpacity onPress={toggleListener} style={styles.button}>
            <Text>Toggle listener</Text>
        </TouchableOpacity>
    </View>
  );
}