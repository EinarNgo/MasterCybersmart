import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Screen from './navigation/Screen';
import { Block, GalioProvider } from "galio-framework";
import { argonTheme } from "./constants/Theme";

export default props => {
  return (
    <NavigationContainer>
      <GalioProvider theme={argonTheme}>
          <Block flex>
            <Screen/>
          </Block>
        </GalioProvider>
    </NavigationContainer>
  );
}