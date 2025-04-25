
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


const HomePage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceSuggestion[]>([]);
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
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: 39.949,
              longitude: -75.194,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsCompass={false}

          >
            <Marker coordinate={{ latitude: 39.949, longitude: -75.194 }} />


            <Polygon
              coordinates={[
                { latitude: 39.951302, longitude: -75.199148 },
                { latitude: 39.955127, longitude: -75.198278 },
                { latitude: 39.954395, longitude: -75.191806 },
                { latitude: 39.950450, longitude: -75.192633 },
              ]}
              fillColor="rgba(0,255,0,0.2)"
              strokeColor="rgba(0,255,0,0.5)"
              strokeWidth={1}
            />

            <Polygon
              coordinates={[
                { latitude: 39.955748, longitude: -75.202191 },
                { latitude: 39.951775, longitude: -75.202191 },
                { latitude: 39.951302, longitude: -75.199148 },
                { latitude: 39.955127, longitude: -75.198278 },
              ]}
              fillColor="rgba(255,0,0,0.2)"
              strokeColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />

            <Polygon
              coordinates={[
                { latitude: 39.955277, longitude: -75.187034 },
                { latitude: 39.952350, longitude: -75.187830 },
                { latitude: 39.951824, longitude: -75.182749 },
                { latitude: 39.954561, longitude: -75.181442 },
              ]}
              fillColor="rgba(255,0,0,0.2)"
              strokeColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />

            <Polygon
              coordinates={[
                { latitude: 39.948670, longitude: -75.216659 },
                { latitude: 39.943422067275556, longitude: -75.21082252249485 },
                { latitude: 39.949963, longitude: -75.201523 }
              ]}
              fillColor="rgba(255,255,0,0.2)"
              strokeColor="rgba(255,255,0,0.5)"
              strokeWidth={1}
            />

            <Polygon
              coordinates={[
                { latitude: 39.956648, longitude: -75.198205 }, // top right
                { latitude: 39.957651, longitude: -75.205930 }, // top left
                { latitude: 39.956203, longitude: -75.206338 }, // bottom left
                { latitude: 39.955299, longitude: -75.198506 }// bottom right
              ]}
              fillColor="rgba(255,255,0,0.2)"
              strokeColor="rgba(255,255,0,0.5)"
              strokeWidth={1}
            />
          </MapView>
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
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  const isTopResult = index === 0;
                  const isDestination = item.place_name.includes('4050 Sansom');

                  return (
                    <TouchableOpacity
                      style={styles.resultItem}
                      onPress={() => {
                        if (isDestination && isTopResult) {
                          router.push('/destination');
                        } else {
                          setSearchQuery(item.place_name);
                        }
                        setSearchResults([]);
                        Keyboard.dismiss();
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

            </View>
          )}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.favoritesContainer}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            {["Home", "Work", "School"].map((label, index) => {
              const iconName = label === "Home" ? "home" : label === "Work" ? "work" : "school";
              const routePath = label === "Home"
                ? "/destination"
                : label === "Work"
                  ? "/work"
                  : "/school";
              return (

                <TouchableOpacity
                  key={label}
                  onPress={() => router.push(routePath)}
                  style={styles.favoriteChip}
                >
                  <MaterialIcons name={iconName} size={16} color="#fff" style={{ marginRight: 5 }} />
                  <Text style={styles.favoriteText}>{label}</Text>
                </TouchableOpacity>
              );

            })}
            <View style={styles.favoriteChip}>
              <MaterialIcons name="add" size={16} color="#fff" />
            </View>
          </ScrollView>

          <View style={styles.compassContainer}>
            <View style={styles.compass}>
              <MaterialIcons name="navigation" size={36} color="#4287f5" />
            </View>
          </View>
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
