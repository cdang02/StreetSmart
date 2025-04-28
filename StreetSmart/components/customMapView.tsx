import React, { forwardRef, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';

type CustomMapViewProps = {
    location: {
        latitude: number;
        longitude: number;
    }
}

const CustomMapView = forwardRef<MapView, CustomMapViewProps>(({ location }, ref) => {
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
            {/* Marker */}
            <Marker coordinate={{ latitude: 39.949, longitude: -75.194 }} />

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
                    { latitude: 39.949963, longitude: -75.201523 }
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
                    { latitude: 39.955299, longitude: -75.198506 }
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
});

export default CustomMapView;
