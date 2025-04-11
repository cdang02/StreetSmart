
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';

const MapScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 39.949,  // Paris coordinates as an example
          longitude: -75.194,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={{ latitude: 39.949, longitude: -75.194 }} />
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Where To?"
          placeholderTextColor="#ccc"
          style={styles.searchInput}
        />
        <Icon name="search" size={16} color="#ccc" style={styles.searchIcon} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.favoritesContainer}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {["Home", "Work", "School"].map((label, index) => (
          <View key={index} style={styles.favoriteChip}>
            <MaterialIcons
              name={
                label === "Home" ? "home" :
                label === "Work" ? "work" : "school"
              }
              size={16}
              color="#fff"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.favoriteText}>{label}</Text>
          </View>
        ))}
        <View style={styles.favoriteChip}>
          <MaterialIcons name="add" size={16} color="#fff" />
        </View>
      </ScrollView>

      <View style={styles.compassContainer}>
        <View style={styles.compass}>
          <MaterialIcons name="navigation" size={24} color="#4287f5" />
        </View>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#2b2b2b',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9d5ff8',
  },
  searchInput: {
    flex: 1,
    color: 'white',
    marginLeft: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
  },
  favoritesContainer: {
    position: 'absolute',
    top: 100,
    paddingVertical: 5,
  },
  favoriteChip: {
    flexDirection: 'row',
    backgroundColor: '#1f1f1f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  favoriteText: {
    color: '#fff',
  },
  compassContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
  compass: {
    backgroundColor: '#2b2b2b',
    padding: 10,
    borderRadius: 10,
  },
});
