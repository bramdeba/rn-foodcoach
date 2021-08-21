import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RootTabScreenProps } from '../types';

export default function SearchScreen({ navigation }: RootTabScreenProps<'Search'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
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
