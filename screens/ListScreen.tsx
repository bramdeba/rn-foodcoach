import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RootTabScreenProps } from '../types';

export default function ListScreen({ navigation }: RootTabScreenProps<'List'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
