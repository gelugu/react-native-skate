import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export const Control = ({ children }) => {
  // Object {
  //   "changedTouches": Array [
  //     [Circular],
  //   ],
  //   "identifier": 0,
  //   "locationX": 72.33333587646484,
  //   "locationY": 136.6666717529297,
  //   "pageX": 202.3333282470703,
  //   "pageY": 411.3333435058594,
  //   "target": 39,
  //   "timestamp": 221676478,
  //   "touches": Array [
  //     [Circular],
  //   ],
  // }

  const FRICTION_FOOT = 20;
  const FRICTION_WHEELS = 3;

  const [speed, setSpeed] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [yStart, setYStart] = useState(0);
  const [yEnd, setYEnd] = useState(0);
  const [timeStart, setTimeStart] = useState(0);
  const [timeEnd, setTimeEnd] = useState(0);

  const skaterRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (speed >= 1)
        setSpeed(speed - (FRICTION_WHEELS % speed ? 1 : FRICTION_WHEELS));
      if (speed <= 0)
        setSpeed(speed + (FRICTION_WHEELS % speed ? 1 : FRICTION_WHEELS));
    }, 100);

    return () => {
      clearInterval(id);
    };
  });

  const moveStartHandler = (e) => {
    if (e.nativeEvent.target === skaterRef.current._nativeTag) return;

    if (speed > 20) setSpeed((speed - FRICTION_FOOT) / 2);
    setTimeStart(Date.now());
    setTimeEnd(Date.now());
    setYStart(e.nativeEvent.locationY);
    setYEnd(e.nativeEvent.locationY);

    console.log(e.nativeEvent.target)
  };

  const moveEndHandler = (e) => {};

  const moveHandler = (e) => {
    if (
      Date.now() - timeStart < 10 ||
      e.nativeEvent.target === skaterRef.current._nativeTag
    )
      return;

    setTimeStart(Date.now());
    setYStart(e.nativeEvent.locationY);

    if (timeEnd - timeStart !== 0)
      setCurrentSpeed(((yEnd - yStart) / (timeEnd - timeStart)) * 3);
    setSpeed((currentSpeed + speed) / 2);

    setTimeEnd(timeStart);
    setYEnd(yStart);
  };

  return (
    <View
      style={styles.container}
      onTouchStart={moveStartHandler}
      onTouchMove={moveHandler}
    >
      <Text style={styles.speed}>{`${Math.floor(speed)} km/h`}</Text>
      <View style={styles.skate} ref={skaterRef} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  speed: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  skate: {
    position: "absolute",
    top: (Dimensions.get("screen").height / 2) - (250 / 2),
    left: (Dimensions.get("screen").width / 2) - (100 / 2),
    width: 100,
    height: 250,
    borderRadius: 20,
    backgroundColor: "black",
    opacity: 0.1,
  },
});
