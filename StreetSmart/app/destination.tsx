import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

import SearchWrapper from '@/components/searchWrapper';

const DestinationScreen: React.FC = () => {
  const router = useRouter();
  const latitude = 39.955;
  const longitude = -75.204;

  // search bar state
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsCompass={false}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          pinColor="#006CDF"
        />
      </MapView>

      {/* Top Search Bar */}
      <SearchWrapper
        value={"4050 Sansom St"}
        onChangeText={setSearchQuery}
      />

      {/* Bottom Card */}
      <View style={styles.bottomCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.address}>4050 Samson St</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
            <Icon name="close" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
        <Text style={styles.distance}>1.0 mi away</Text>
        <TouchableOpacity style={styles.selectButton} onPress={() => router.push('/routeSelection')}>
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DestinationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#333',
    padding: 7,
    borderRadius: 30,
  },
  searchBar: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: '#363636',
    borderRadius: 30,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  searchText: {
    fontFamily: 'GolosText',
    color: '#fff',
    fontSize: 16,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#363636',
    borderRadius: 30,
    padding: 20,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#333',
    padding: 7,
    borderRadius: 30,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    fontFamily: 'GolosText',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  distance: {
    color: '#ccc',
    marginTop: 8,
    marginBottom: 16,
  },
  selectButton: {
    backgroundColor: '#006CDF',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  selectButtonText: {
    fontFamily: 'GolosText',
    color: '#fff',
    fontSize: 16,
  },
});