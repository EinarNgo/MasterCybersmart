import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, SectionList} from 'react-native';
import { Auth } from 'aws-amplify';

export default function Home({ updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  let INF = [
    {id: '1', value: 'Kryptografi'},
    {id: '2', value: 'Etisk hacking'},
    {id: '3', value: 'Personvern'},
    {id: '4', value: 'Passordhåndtering'},
  ];
  let A = [
    {id: '1', value: 'Kryptering'},
    {id: '2', value: 'Etisk hacking'},
    {id: '3', value: 'Personvern'},
  ];
  let B = [
    {id: '1', value: 'Kryptering'},
    {id: '2', value: 'Etisk hacking'},
    {id: '3', value: 'Personvern'},
  ];
  let C = [
    {id: '1', value: 'Kryptering'},
    {id: '2', value: 'Etisk hacking'},
    {id: '3', value: 'Personvern'},
  ];
  let D = [
    {id: '1', value: 'Kryptering'},
    {id: '2', value: 'Etisk hacking'},
    {id: '3', value: 'Personvern'},
  ];
  let E = [
    {id: '1', value: 'Kryptering'},
    {id: '2', value: 'Etisk hacking'},
    {id: '3', value: 'Personvern'},
  ];

  const FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={styles.listItemSeparatorStyle} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SectionList
          ItemSeparatorComponent={FlatListItemSeparator}
          sections={[
            {title: 'UNDERVISNING', data: INF},
            {title: 'OPPGAVER - ENKELT', data: A},
            {title: 'OPPGAVER - ENKEL-MIDDELS', data: B},
            {title: 'OPPGAVER - MIDDELS', data: C},
            {title: 'OPPGAVER - MIDDELS-VANSKELIG', data: D},
            {title: 'OPPGAVER - VANSKELIG', data: E},
          ]}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeaderStyle}>
              {section.title}
            </Text>
          )}
          renderItem={({item}) => (
            // Item for the FlatListItems
            <Text
              style={styles.sectionListItemStyle}
              //Item Separator View
              onPress={() => alert(JSON.stringify(item))}>
              {item.value}
            </Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>

      <View style={styles.bottom}>
          <Button title="Sign Out" color="#03A9F4" onPress={signOut} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
    flex: 15,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  sectionHeaderStyle: {
    backgroundColor: '#03A9F4',
    fontSize: 20,
    padding: 5,
    color: '#fff',
  },
  sectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: '#F5F5F5',
  },
  listItemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
});