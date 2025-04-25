import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import MapView, { Marker, Polygon, Polyline, Callout } from 'react-native-maps';

export const options = {
  headerShown: false,
};

export default function RouteGuidanceScreen() {
  const { routeId } = useLocalSearchParams();

  const directionInstruction = 'TURN RIGHT on Chestnut St.';
  const timeRemaining = '27 min';
  const distanceRemaining = '1.3 mi remaining';
  const arrivalTime = 'Arrival: 17:55';
  const pathColor = '#02ccfe';
  const pathWdith = 4;

  const alerts = [
    {
      id: '1',
      title: 'GUNSHOTS',
      timeframe: 'Recent',
      details: `Multiple reports of gunfire called in. Witnesses described hearing approximately six shots. Police have arrived on scene; no injuries reported.`,
      coordinates: { latitude:  39.95421500772583, longitude:-75.20086783216364 }, 
    },
    {
      id: '2',
      title: 'ROBBERY',
      timeframe: '2hr ago',
      details: `An armed robbery occurred CVS. The suspect fled on foot heading east on Spruce St. Nearby businesses have heightened security.`,
      coordinates: { latitude: 39.95238180044618, longitude:-75.19950482081953 }, 
    },
    {
      id: '3',
      title: 'DEATH',
      timeframe: '3hr ago',
      details: `A fatal incident took place in an apartment complex downtown. Police have taped off the area for investigation. No current threat to the public.`,
      coordinates: { latitude: 39.953401, longitude: -75.183782},
    },
  ];

  const RouteMap = () => {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 39.949,
          longitude: -75.194,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Start marker */}
        <Marker coordinate={{ latitude: 39.948745999169454, longitude: -75.19392418630237 }} />

        {/* Destination marker: 4050 Sansom */}
        <Marker coordinate={{ latitude: 39.955191716924325, longitude: -75.20444462794761 }} />

        {/* Route line */}
          <Polyline
            coordinates={[
                { latitude: 39.948640, longitude: -75.193059},
                { latitude: 39.95435010831815, longitude: -75.19181457734419 }, 
                { latitude: 39.95594102983853, longitude:  -75.20477593224},
                { latitude: 39.955194100332186, longitude: -75.20492774302501},
                {latitude: 39.955191716924325, longitude: -75.20444462794761}
            ]}
              strokeColor={pathColor}
              strokeWidth={pathWdith}
          />

        {/* Alert pins */}
        {alerts.map((alert) => (
          <Marker
            key={alert.id}
            coordinate={alert.coordinates}>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>⚠️</Text>
            </View>            

            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{alert.title}</Text>
                <Text style={styles.calloutTime}>{alert.timeframe}</Text>
                <Text style={styles.calloutDetails}>{alert.details}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {/* Area polygons */}
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
            { latitude: 39.949963, longitude: -75.201523 },
          ]}
          fillColor="rgba(255,255,0,0.2)"
          strokeColor="rgba(255,255,0,0.5)"
          strokeWidth={1}
        />
        <Polygon
          coordinates={[
            { latitude: 39.956648, longitude: -75.198205 },
            { latitude: 39.957651, longitude: -75.205930 },
            { latitude: 39.956203, longitude: -75.206338 },
            { latitude: 39.955299, longitude: -75.198506 },
          ]}
          fillColor="rgba(255,255,0,0.2)"
          strokeColor="rgba(255,255,0,0.5)"
          strokeWidth={1}
        />
      </MapView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.directionText}>{directionInstruction}</Text>
        <Pressable style={styles.stopButton} onPress={() => router.back()}>
          <Text style={styles.stopButtonText}>STOP</Text>
        </Pressable>
      </View>

      {/* Map now fills the entire screen below the top bar */}
      <View style={styles.mapContainer}>
        <RouteMap />
      </View>

      {/* Info Overlays */}
      <View style={styles.infoOverlay}>
        <Text style={styles.infoText}>
          {timeRemaining} • {distanceRemaining}
        </Text>
        <Text style={styles.infoText}>{arrivalTime}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
  },
  directionText: {
    fontFamily: 'GolosText',
    color: '#fff',
    fontSize: 25,
    maxWidth: '70%',
  },
  stopButton: {
    backgroundColor: '#FF5252',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  stopButtonText: {
    color: '#FFF',
    fontFamily: 'GolosText',
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
    overflow: 'hidden',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#252525',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontFamily: 'GolosText',
    fontSize: 16,
  },
  callout: {
    backgroundColor: '#252525',
    padding: 10,
    borderRadius: 12,
    width: 250,
  },
  calloutTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'GolosText',
    fontSize: 16,
  },
  calloutTime: {
    color: '#bdbdbd',
    fontSize: 13,
    fontFamily: 'GolosText',
    marginBottom: 6,
  },
  calloutDetails: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'GolosText',
  },
  emojiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 30,
  },
});
