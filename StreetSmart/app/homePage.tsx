
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard, FlatList,
} from 'react-native';
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useRef } from 'react';

import SearchBar from '@/components/searchBar';
import CustomMapView from '@/components/customMapView';
import DestinationCard from '@/components/destinationCard';

type Location = {
  name: string;
  latitude: number;
  longitude: number;
};

const startLocation: Location = {
  name: 'Start Location',
  latitude: 39.949,
  longitude: -75.194,
};

const HomePage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceSuggestion[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location>(startLocation);
  const [isSelecting, setIsSelecting] = useState(false);
  const mapRef = useRef<MapView | null>(null);

  const resetNorth = () => {
    mapRef.current?.animateCamera({ heading: 0 }, { duration: 300 });
  };

  type PlaceSuggestion = {
    id: string;
    place_name: string;
    center: [number, number];
  };

  useEffect(() => {
    if (isSelecting) {
      setIsSelecting(false);
      return;
    }

    const fetchMapBoxPlaces = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json`,
          {
            params: {
              access_token: 'pk.eyJ1IjoiY2luZGFuZyIsImEiOiJjbTlkYm5zdTcweHc1Mm5vZWdwa3VmMjNqIn0.IdOU0DJTlDfKeiQG4jSQyw',
              country: 'us',
              autocomplete: true,
              limit: 7,
              types: 'address',
              proximity: '-75.194,39.949'
            },
          }
        );
        if (res.data.features) {
          setSearchResults(res.data.features);
        } else {
          console.warn('No features found in Mapbox response');
          setSearchResults([]);
        }
      } catch (err) {
        console.error('Mapbox request failed:', err);
      }
    };

    fetchMapBoxPlaces();
  }, [searchQuery]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <CustomMapView location={startLocation} ref={mapRef} />
          <View style={{ marginVertical: 60, width: '90%', alignSelf: 'center' }}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              showClearButton={searchQuery.length > 0}
            />
          </View>

          {searchResults.length > 0 && (
            <View style={styles.resultsContainer}>
              <View style={styles.resultsHeaderContainer}>
                <Text style={styles.resultsHeader}>Search Results</Text>
                <TouchableOpacity onPress={() => setSearchResults([])}>
                  <Text style={styles.clearButton}>Clear</Text>
                </TouchableOpacity>
              </View>
              {searchResults.length > 0 && (
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => {
                    const isTopResult = index === 0;
                    const isDestination = item.place_name === '4050 Sansom Street, Philadelphia, Pennsylvania 19104, United States';

                    return (
                      <TouchableOpacity
                        style={styles.resultItem}
                        onPress={() => {
                          setIsSelecting(true);

                          setSearchResults([]);
                          Keyboard.dismiss();

                          if (isDestination && isTopResult) {
                            // router.push('/destination');
                            setSearchQuery('4050 Sansom Street');
                            if (mapRef.current) {
                              mapRef.current.animateToRegion({
                                latitude: item.center[1],
                                longitude: item.center[0],
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                              }, 500);
                            }
                            setSelectedLocation({
                              name: "4050 Sansom Street",
                              latitude: item.center[1],
                              longitude: item.center[0],
                            });
                          } else {
                            setSearchQuery(item.place_name);
                          }
                        }}
                      >
                        <Text
                          style={[
                            styles.resultText,
                            isTopResult && styles.topResultText,
                          ]}
                        >
                          {item.place_name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              )}

            </View>
          )}

          {selectedLocation?.name === '4050 Sansom Street' && (
            <DestinationCard
              address={selectedLocation.name}
              onClose={() => {
                setSelectedLocation(startLocation);
                setSearchQuery('');
              }} />
          )}

          {selectedLocation?.name !== '4050 Sansom Street' && (
            <View style={styles.compassContainer}>
              <View style={styles.compass}>
                <MaterialIcons name="navigation" size={36} color="#4287f5" />
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  resultsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  resultsHeader: {
    fontFamily: 'GolosText',
    fontSize: 16,
    color: '#aaa',
    fontWeight: 'bold',
  },
  topResultText: {
    fontFamily: 'GolosText',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
  searchInput: {
    fontFamily: 'GolosText',
    flex: 1,
    fontSize: 18,
    color: 'white',
    marginLeft: 20,
  },
  searchIcon: {
    position: 'absolute',
    left: 15
  },
  resultsContainer: {
    position: 'absolute',
    top: 130,
    left: 20,
    right: 20,
    backgroundColor: '#363636',
    borderRadius: 30,
    maxHeight: 500,
    zIndex: 10,
  },
  resultItem: {
    padding: 12,
    borderBottomColor: '#444',
    borderBottomWidth: 5,
  },
  resultText: {
    fontFamily: 'GolosText',
    fontSize: 18,
    color: '#fff',
  },
  favoritesContainer: {
    position: 'absolute',
    top: 100,
    paddingVertical: 30,
    left: 15
  },
  favoriteChip: {
    flexDirection: 'row',
    backgroundColor: '#363636',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
    alignItems: 'center',
    marginRight: 10,
  },
  favoriteText: {
    fontFamily: 'GolosText',
    color: '#fff',
  },
  compassContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
  compass: {
    backgroundColor: '#363636',
    padding: 10,
    borderRadius: 30,
  },
  clearButton: {
    fontFamily: 'GolosText',
    fontSize: 14,
    color: '#f66',
    padding: 4,
  },
});
