import React, { useState, useEffect } from 'react';
import Amplify, { API, Auth, graphqlOperation  } from 'aws-amplify';
import { StyleSheet, Dimensions, ScrollView, Text, View, Image } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { listCtfs } from '../graphql/queries';
import { updateSong } from '../graphql/mutations';
const { width } = Dimensions.get('screen');


export default function Ctf({ navigation, updateAuthState }) {
  const [ctfs, setCtfs] = useState([]);

  useEffect(() => {
      fetchCtfs();
  }, []);

  const fetchCtfs = async () => {
    try {
        const ctfData = await API.graphql(graphqlOperation(listCtfs));
        const ctfList = ctfData.data.listCtfs.items;
        console.log('ctf list', ctfList);
        setCtfs(ctfList);
    } catch (error) {
        console.log('error on fetching ctf', error);
    }
  };

  return (
    <Block flex center style={styles.home1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}>
        <Block flex>
        {ctfs.map((ctf, idx) => {
          return (
        
            <Card key={`ctf${idx}`}>
            <Card.Title style={{textAlign:'center',fontSize:30}}>{ctf.name}</Card.Title>
            <Card.Title >{ctf.points}</Card.Title>
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