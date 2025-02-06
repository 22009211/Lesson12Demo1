import React,{useState, useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import { Gyroscope } from 'expo-sensors';

const styles = StyleSheet.create({
  container: {
   
  },
});

export default function App() {

  const [{x, y, z}, setData] = useState({x:0, y:0, z:0});

  //function for listener
  const handleSensorData = (data) => {
      let x = data.x;
      let y = data.y;
      let z = data.z;
      setData({x, y, z});
  };

  useEffect(() => {
      Gyroscope.setUpdateInterval(100);
      const subscription = Gyroscope.addListener(handleSensorData);
      return () => subscription.remove();
      }, []);

  return (
    <View>
      <StatusBar/>
      <Text>x: {x}</Text>
      <Text>y: {y}</Text>
      <Text>z: {z}</Text>
    </View>
  );
}