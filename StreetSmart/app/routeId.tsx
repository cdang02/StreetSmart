import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import MapView, { Marker, Polygon, Polyline } from 'react-native-maps';


export const options = {
  headerShown: false,
};

export default function RouteGuidanceScreen() {
  const { routeId } = useLocalSearchParams();

  //Sample Data
  const directionInstruction = 'TURN RIGHT on Chestnut St';
  const timeRemaining = '15 min';
  const distanceRemaining = '0.6 mi remaining';
  const arrivalTime = 'Arrival: 17:45';

  // Description for each alert
  const alerts = [
    {
      id: '1',
      title: 'GUNSHOTS',
      timeframe: 'Recent',
      details: `Multiple reports of gunfire were called in along Chestnut St near 2nd Avenue. Witnesses described hearing approximately six shots. Police have arrived on scene; no injuries reported. The suspect vehicle was described as a dark sedan. Expect increased police presence in the area.`,
    },
    {
      id: '2',
      title: 'ROBBERY',
      timeframe: '2hr ago',
      details: `An armed robbery occurred at a local convenience store. The suspect, described as a tall male wearing a black hoodie, fled on foot heading east on Main St. Authorities advise caution and to report any suspicious activity. Nearby businesses have heightened security for the remainder of the evening.`,
    },
    {
      id: '3',
      title: 'DEATH',
      timeframe: '3hr ago',
      details: `A fatal incident took place in an apartment complex downtown. Emergency services responded to a call from neighbors around 14:00. Official details remain scarce, but police have taped off the area for investigation. No threat to the public is currently reported. Expect partial closure of Cedar Ln due to police activity.`,
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<null | {
    id: string;
    title: string;
    timeframe: string;
    details: string;
  }>(null);

  const handleDetailsPress = (alertItem: {
    id: string;
    title: string;
    timeframe: string;
    details: string;
  }) => {
    setSelectedAlert(alertItem);
    setModalVisible(true);
  };


  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAlert(null);
  };

  // renders the map
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
      // key={clickedCard?.id || 'default'}
      >
        {/* Start marker */}
        <Marker coordinate={{ latitude: 39.949, longitude: -75.194 }} />

        {/* Destination marker: 4050 Sansom */}
        <Marker coordinate={{ latitude: 39.954178, longitude: -75.202984 }} />

        <Polyline
          coordinates={[
            { latitude: 39.949, longitude: -75.194 },
            { latitude: 39.95504005198623, longitude: -75.19424563042115 }, // Rose's Florist
            { latitude: 39.954178, longitude: -75.202984 },
          ]}
          strokeColor="#2DFE54"
          strokeWidth={2}
        />

        {/* Polygons */}
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
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.directionText}>{directionInstruction}</Text>
        <Pressable
          style={styles.stopButton}
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.stopButtonText}>STOP</Text>
        </Pressable>
      </View>

      {/* MIDDLE: map placeholder (dark) */}
      <View style={styles.mapPlaceholder}>
        <RouteMap />
      </View>

      {/* INFO ROW: time, distance, arrival */}
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>
          {timeRemaining} • {distanceRemaining}
        </Text>
        <Text style={styles.infoText}>{arrivalTime}</Text>
      </View>

      {/* BOTTOM: alerts section in dark boxes */}
      <View style={styles.alertsSection}>
        <Text style={styles.alertsTitle}>ALERTS:</Text>
        <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
          {alerts.map((alert) => (
            <View key={alert.id} style={styles.alertItem}>
              {/* Box for the alert info */}
              <View style={styles.alertBox}>
                <Text style={styles.alertType}>{alert.title}</Text>
                <Text style={styles.alertTime}>- {alert.timeframe}</Text>
              </View>
              {/* “Details” button on the right */}
              <Pressable
                style={styles.detailsButton}
                onPress={() => handleDetailsPress(alert)}
              >
                <Text style={styles.detailsButtonText}>Details</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ------------------ MODAL for Details ------------------ */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Title and timeframe */}
            {selectedAlert && (
              <>
                <Text style={styles.modalTitle}>{selectedAlert.title}</Text>
                <Text style={styles.modalTimeframe}>{selectedAlert.timeframe}</Text>
                <View style={styles.modalDivider} />
                {/* Detailed description */}
                <ScrollView style={styles.modalScroll}>
                  <Text style={styles.modalDetails}>{selectedAlert.details}</Text>
                </ScrollView>
              </>
            )}
            {/* Close Button */}
            <Pressable style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ----------------- STYLES (Dark Mode) -----------------
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    backgroundColor: '#363636',
  },
  // Top bar
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

  // Middle "Map Placeholder"
  mapPlaceholder: {
    flex: 1,
    margin: 16,
    borderRadius: 30,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    color: '#aaa',
    fontFamily: 'GolosText',
    fontSize: 18,
  },

  // Info row (time, distance, arrival)
  infoRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    color: '#fff',
    fontFamily: 'GolosText',
    fontSize: 25,
    marginVertical: 2,
  },

  // Alerts area
  alertsSection: {
    backgroundColor: '#252525',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
  },
  alertsTitle: {
    color: '#fff',
    paddingTop: 6,
    fontSize: 20,
    fontFamily: 'GolosText',
    marginBottom: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertBox: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#252525',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  alertType: {
    fontWeight: '700',
    color: '#fff',
    marginRight: 4,
    fontSize: 16,
    fontFamily: 'GolosText',
  },
  alertTime: {
    color: '#bdbdbd',
    fontSize: 14,
    fontFamily: 'GolosText',
  },
  detailsButton: {
    backgroundColor: '#006CDF',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  detailsButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'GolosText',
  },

  // -------------- Modal Styles --------------
  modalOverlay: {
    flex: 1,
    backgroundColor: '#363636',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#252525',
    borderRadius: 30,
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 4,
    fontFamily: 'GolosText',
  },
  modalTimeframe: {
    fontSize: 16,
    color: '#bdbdbd',
    fontFamily: 'GolosText',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 10,
  },
  modalScroll: {
    marginBottom: 16,
  },
  modalDetails: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'GolosText',
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#3478F6',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  closeButtonText: {
    fontFamily: 'GolosText',
    color: '#fff'
  },
});
