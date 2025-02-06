import React,{useState, useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import { Magnetometer } from 'expo-sensors';

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
    },
    middleButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
});

export default function App() {

  const [{x, y, z}, setData] = useState({x:0, y:0, z:0});

    const [subscription, setSubscription] = useState(null);

    const _slow = () => Magnetometer.setUpdateInterval(100);
    const _fast = () => Magnetometer.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(
            Magnetometer.addListener(result => {
                setData(result);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

  return (
    <View>
      <StatusBar/>
      <Text>x: {x}</Text>
      <Text>y: {y}</Text>
      <Text>z: {z}</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
                <Text>{subscription ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
                <Text>Slow</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_fast} style={styles.button}>
                <Text>Fast</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}