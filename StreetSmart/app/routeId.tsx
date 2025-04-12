import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function NavigationScreen() {
  // Hardcoded sample data
  const directionInstruction = 'TURN RIGHT on Chestnut St';
  const timeRemaining = '15 min';
  const distanceRemaining = '0.6 mi remaining';
  const arrivalTime = 'Arrival: 17:45';

  // Example alerts
  const alerts = [
    { id: '1', title: 'Gunshots', timeframe: 'Recent' },
    { id: '2', title: 'Robbery', timeframe: '2hr ago' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar with direction & a STOP/EXIT button */}
      <View style={styles.topBar}>
        <Text style={styles.directionText}>{directionInstruction}</Text>
        <Pressable
          style={styles.stopButton}
          onPress={() => {
            // Your exit logic here
            console.log('Stop pressed');
          }}
        >
          <Text style={styles.stopButtonText}>STOP</Text>
        </Pressable>
      </View>

      {/* Middle area (placeholder for map or blank) */}
      <View style={styles.mapPlaceholder}>
        {/* If you want to ignore the map, just leave this blank. */}
        <Text style={{ color: '#999' }}>[Map Placeholder]</Text>
      </View>

      {/* Lower info row: time, distance, arrival */}
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>
          {timeRemaining} • {distanceRemaining}
        </Text>
        <Text style={styles.infoText}>{arrivalTime}</Text>
      </View>

      {/* Bottom alerts section */}
      <View style={styles.alertsSection}>
        <Text style={styles.alertsTitle}>ALERTS:</Text>

        {/* If you have multiple alerts, a scroll container if they can be many */}
        <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
          {alerts.map((alert) => (
            <View key={alert.id} style={styles.alertItem}>
              <View style={styles.alertTextWrapper}>
                <Text style={styles.alertType}>{alert.title.toUpperCase()}</Text>
                <Text style={styles.alertTime}>- {alert.timeframe}</Text>
              </View>
              <Pressable
                style={styles.detailsButton}
                onPress={() => {
                  // Navigate to alert details or show a modal
                  console.log(`Details for ${alert.title}`);
                }}
              >
                <Text style={styles.detailsButtonText}>DETAILS</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Top bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  directionText: {
    fontSize: 20,
    fontWeight: '700',
    maxWidth: '75%',
  },
  stopButton: {
    backgroundColor: '#FF5252',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  stopButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },

  // Middle map placeholder
  mapPlaceholder: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Info row (time, distance, arrival)
  infoRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
  },

  // Bottom alerts list
  alertsSection: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  alertsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTextWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  alertType: {
    fontWeight: '600',
    marginRight: 4,
  },
  alertTime: {
    color: '#666',
  },
  detailsButton: {
    backgroundColor: '#3478F6',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  detailsButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
