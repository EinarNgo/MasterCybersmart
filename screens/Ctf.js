import React, { useState, useEffect } from 'react';
import Amplify, { API, Auth, graphqlOperation  } from 'aws-amplify';
import { StyleSheet, Dimensions, ScrollView, Text, View, Image } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { listModulers } from '../graphql/queries';
const { width } = Dimensions.get('screen');


export default function Ctf({ navigation, updateAuthState }) {
  const [modulers, setModulers] = useState([]);

  useEffect(() => {
      fetchModulers();
  }, []);

  const fetchModulers = async () => {
    try {
        const modulerData = await API.graphql(graphqlOperation(listModulers));
        const modulerList = modulerData.data.listModulers.items;
        console.log('module list', modulerList);
    } catch (error) {
        console.log('error on fetching modul', error);
    }
  };

  return (
    <Block flex center style={styles.home1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}>
        <Block flex>
        {modulers.map((modul, idx) => {
          return (
            <Card key={`modul${idx}`}>
            <Card.Title style={{textAlign:'center',fontSize:30}}>{modul.kategori}</Card.Title>
            <Card.Title >{modul.points}</Card.Title>
            <Card.Divider/>
              <Text style={{marginBottom: 10}}>
                The idea with React Native Elements is more about component structure than actual design.
                The idea with React Native Elements is more about component structure than actual design.
              </Text>
              <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VIEW NOW' />
            </Card>
          )
          })}

        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  home1: {
    width: width,
    paddingTop: 50, 
  },
  scrollList: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});