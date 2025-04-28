import React, { forwardRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Polygon, Polyline, Callout } from 'react-native-maps';

type Alert = {
    id: string;
    title: string;
    timeframe: string;
    details: string;
    coordinates: { latitude: number; longitude: number };
};

type CustomMapViewProps = {
    location: {
        latitude: number;
        longitude: number;
    };
    clickedCardId?: '1' | '2' | '3' | null;
    showRoutes?: boolean;
};

const alerts: Alert[] = [
    {
        id: '1',
        title: 'GUNSHOTS',
        timeframe: 'Recent',
        details: 'Multiple reports of gunfire called in. No injuries reported.',
        coordinates: { latitude: 39.954215, longitude: -75.200868 },
    },
    {
        id: '2',
        title: 'ROBBERY',
        timeframe: '2hr ago',
        details: 'An armed robbery occurred at CVS. Suspect fled east.',
        coordinates: { latitude: 39.952382, longitude: -75.199505 },
    },
    {
        id: '3',
        title: 'DEATH',
        timeframe: '3hr ago',
        details: 'A fatal incident took place in an apartment complex downtown.',
        coordinates: { latitude: 39.953401, longitude: -75.183782 },
    },
];

const pathColor = '#02ccfe';
const pathWidth = 4;

const CustomMapView = forwardRef<MapView, CustomMapViewProps>(({ location, clickedCardId, showRoutes }, ref) => {
    return (
        <MapView
            ref={ref}
            style={styles.map}
            initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            showsCompass={false}
        >
            {/* Start marker */}
            <Marker coordinate={{ latitude: 39.948746, longitude: -75.193924 }} />

            {/* Destination marker */}
            <Marker coordinate={{ latitude: 39.955192, longitude: -75.204445 }} />

            {/* Alert markers */}
            {alerts.map((alert) => (
                <Marker key={alert.id} coordinate={alert.coordinates}>
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

            {/* Only show polylines if showRoutes === true */}
            {showRoutes && clickedCardId === '1' && (
                <Polyline
                    coordinates={[
                        { latitude: 39.948640, longitude: -75.193059 },
                        { latitude: 39.950479, longitude: -75.192686 },
                        { latitude: 39.951791, longitude: -75.203044 },
                        { latitude: 39.954848, longitude: -75.202451 },
                        { latitude: 39.955192, longitude: -75.204445 }
                    ]}
                    strokeColor={pathColor}
                    strokeWidth={pathWidth}
                />
            )}
            {showRoutes && clickedCardId === '2' && (
                <Polyline
                    coordinates={[
                        { latitude: 39.948640, longitude: -75.193059 },
                        { latitude: 39.951244, longitude: -75.192535 },
                        { latitude: 39.951338, longitude: -75.193246 },
                        { latitude: 39.951673, longitude: -75.193216 },
                        { latitude: 39.951951, longitude: -75.194402 },
                        { latitude: 39.952692, longitude: -75.200432 },
                        { latitude: 39.953588, longitude: -75.201022 },
                        { latitude: 39.953621, longitude: -75.201720 },
                        { latitude: 39.953975, longitude: -75.201752 },
                        { latitude: 39.954057, longitude: -75.202492 },
                        { latitude: 39.954871, longitude: -75.202374 },
                        { latitude: 39.955192, longitude: -75.204445 }
                    ]}
                    strokeColor={pathColor}
                    strokeWidth={pathWidth}
                />
            )}
            {showRoutes && clickedCardId === '3' && (
                <Polyline
                    coordinates={[
                        { latitude: 39.948640, longitude: -75.193059 },
                        { latitude: 39.954350, longitude: -75.191815 },
                        { latitude: 39.955941, longitude: -75.204776 },
                        { latitude: 39.955194, longitude: -75.204928 },
                        { latitude: 39.955192, longitude: -75.204445 }
                    ]}
                    strokeColor={pathColor}
                    strokeWidth={pathWidth}
                />
            )}

            {/* Background polygons */}
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
                    { latitude: 39.943422, longitude: -75.210823 },
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
});

const styles = StyleSheet.create({
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    emojiContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: {
        fontSize: 30,
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
        fontSize: 16,
    },
    calloutTime: {
        color: '#bdbdbd',
        fontSize: 13,
        marginBottom: 6,
    },
    calloutDetails: {
        color: '#fff',
        fontSize: 14,
    },
});

export default CustomMapView;
