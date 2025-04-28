import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

import SearchBar from '@/components/searchBar';
import CustomMapView from '@/components/customMapView';
import DestinationCard from '@/components/destinationCard';
import RouteSelectionCard from '@/components/routeSelectionCard';

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

type PlaceSuggestion = {
  id: string;
  place_name: string;
  center: [number, number];
};

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceSuggestion[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location>(startLocation);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showRouteSelection, setShowRouteSelection] = useState(false);
  const [clickedCardId, setClickedCardId] = useState<string | null>(null);

  const mapRef = useRef<MapView | null>(null);

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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <CustomMapView
            location={startLocation}
            ref={mapRef}
            clickedCardId={clickedCardId as '1' | '2' | '3' | null}
            showRoutes={showRouteSelection}
          />

          <View style={{ marginVertical: 60, width: '90%', alignSelf: 'center' }}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              showClearButton={searchQuery.length > 0}
            />
          </View>

          {searchResults.length > 0 && (
            <View style={styles.resultsContainer}>
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  const isTopResult = index === 0;
                  const isDestination = item.place_name.includes('4050 Sansom Street');

                  return (
                    <TouchableOpacity
                      style={styles.resultItem}
                      onPress={() => {
                        setIsSelecting(true);
                        setSearchResults([]);
                        Keyboard.dismiss();

                        if (isDestination && isTopResult) {
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
                      <Text style={styles.resultText}>
                        {item.place_name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}

          {selectedLocation?.name === '4050 Sansom Street' && !showRouteSelection && (
            <DestinationCard
              address={selectedLocation.name}
              onClose={() => {
                setSelectedLocation(startLocation);
                setSearchQuery('');
              }}
              onSelect={() => setShowRouteSelection(true)}
            />
          )}

          {selectedLocation?.name !== '4050 Sansom Street' && (
            <View style={styles.compassContainer}>
              <View style={styles.compass}>
                <MaterialIcons name="navigation" size={36} color="#4287f5" />
              </View>
            </View>
          )}

          {showRouteSelection && (
            <RouteSelectionCard
              onCancel={() => {
                setShowRouteSelection(false);
                setClickedCardId(null);
              }}
              onSelectRoute={(id: string) => {
                setClickedCardId(id);
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    fontSize: 18,
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
});
