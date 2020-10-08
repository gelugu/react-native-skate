import React, { useEffect, useRef, useState } from "react";
import {
  PanResponder,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Control } from "./src/control/Control";

export default function App() {
  return (
    <Control>
      <Text>Some content</Text>
    </Control>
  );
}

const styles = StyleSheet.create({});
