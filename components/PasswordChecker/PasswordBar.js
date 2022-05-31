import React, { useState, useEffect } from "react";
import { View, Dimensions, Animated } from "react-native";
import PropTypes from "prop-types";

//Passordbar
const deviceWindow = Dimensions.get("window"),
  regexArr = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/];

const PasswordBar = (props) => {
  const barLength = deviceWindow.width * 0.8,
    [passStat, setPassStat] = useState("Weak"),
    [animateVal, setAnimateVal] = useState(new Animated.Value(0)),
    [animateColor, setAnimateColor] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(animateVal, {
      bounciness: 15,
      toValue: barLength * (props.password.length / props.maxLength),
    }).start();
    let passPoint = 0;

    if (props.password.length > 0 && props.password.length < props.minLength)
      setPassStat(props.labels[0]);
    else {
      regexArr.forEach((rgx) =>
        rgx.test(props.password) ? (passPoint += 1) : null
      );
      setPassStat(props.labels[passPoint]);
    }
    Animated.timing(animateColor, {
      toValue: passPoint,
      duration: 300,
    }).start();
  }, [props.password]);

  const interpolateColor = animateColor.interpolate({
    inputRange: [0, 5],
    outputRange: ["rgb(255,0,0)", "rgb(0, 255, 0)"],
  });

  return (
    <View style={{ alignSelf: "center" }}>
      <View style={styles.backBar} />
      <Animated.View
        style={[
          styles.mainBar,
          { backgroundColor: interpolateColor, width: animateVal },
        ]}
      />
      {props.showLabels ? (
        props.password.length != 0 ? (
          <Animated.Text
            style={{
              margin: 1,
              marginTop: 5,
              fontSize: 15,
              fontWeight: "bold",
              color: interpolateColor,
            }}
          >
            {passStat}
          </Animated.Text>
        ) : null
      ) : null}
    </View>
  );
};

const styles = {
  backBar: {
    backgroundColor: "lightgray",
    width: deviceWindow.width * 0.8,
    height: 12,
    borderRadius: 25,
  },
  mainBar: {
    position: "absolute",
    backgroundColor: "blue",
    height: 12,
    borderRadius: 25,
  },
};

PasswordBar.propTypes = {
  minLength: PropTypes.number,
  showLabels: PropTypes.bool,
  maxLength: PropTypes.number,
  labels: PropTypes.array.isRequired,
  password: PropTypes.string.isRequired,
};

PasswordBar.defaultProps = {
  minLength: 4,
  maxLength: 15,
  showLabels: true,
};

export default PasswordBar;
