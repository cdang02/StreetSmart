import React from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Polygon, Polyline, Callout } from 'react-native-maps';

import SearchBar from '@/components/searchBar';
import BackButton from '@/components/backButton';
import SearchWrapper from '@/components/searchWrapper';

// define type of path
type Path = {
    id: string;
    title: string;
    duration: string;
    label: string;
    color: string;
    buttonColor: string;
    info: string;
};
// alerts
const alerts = [
    {
        id: '1',
        title: 'GUNSHOTS',
        timeframe: 'Recent',
        details: `Multiple reports of gunfire called in. Witnesses described hearing approximately six shots. Police have arrived on scene; no injuries reported.`,
        coordinates: { latitude: 39.95421500772583, longitude: -75.20086783216364 },
    },
    {
        id: '2',
        title: 'ROBBERY',
        timeframe: '2hr ago',
        details: `An armed robbery occurred CVS. The suspect fled on foot heading east on Spruce St. Nearby businesses have heightened security.`,
        coordinates: { latitude: 39.95238180044618, longitude: -75.19950482081953 },
    },
    {
        id: '3',
        title: 'DEATH',
        timeframe: '3hr ago',
        details: `A fatal incident took place in an apartment complex downtown. Police have taped off the area for investigation. No current threat to the public.`,
        coordinates: { latitude: 39.953401, longitude: -75.183782 },
    },
];

// create the hard coded routes 
const paths: Path[] = [
    {
        id: '1',
        title: 'Best Route',
        duration: '20 mins, 1.0 mi',
        label: '9',
        color: '#4CAF50', // green
        buttonColor: '#2979FF',
        info: 'This route takes a slight detour but avoids an area that had gunshots (2) and robberies (1) in the past hour.',
    },
    {
        id: '2',
        title: 'Shortest Route',
        duration: '18 mins, 0.85 mi',
        label: '2',
        color: '#F44336', // red
        buttonColor: '#2979FF',
        info: 'This route takes the most direct path to the destination. However, on the way there, it passes through an area that had gunshots (2) and robberies (1) in the past hour.',
    },
    {
        id: '3',
        title: 'Longest Route',
        duration: '30 mins, 1.5 mi',
        label: '5',
        color: '#FFC107', // amber
        buttonColor: '#2979FF',
        info: 'This route takes a slight detour. The area it passes through has no recent crime reported, but historically has had crime.',
    },
];
const pathColor = '#02ccfe';
const pathWidth = 4;

// renders the map
const RouteMap = ({ clickedCard }: { clickedCard: Path | null }) => {
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 39.949,
                longitude: -75.194,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            showsCompass={false}
        // key={clickedCard?.id || 'default'}
        >
            {/* Start marker */}
            <Marker coordinate={{ latitude: 39.948745999169454, longitude: -75.19392418630237 }} />

            {/* Destination marker: 4050 Sansom */}
            <Marker coordinate={{ latitude: 39.955191716924325, longitude: -75.20444462794761 }} />
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


            {clickedCard?.id === '1' && (
                <Polyline
                    coordinates={[
                        { latitude: 39.948640, longitude: -75.193059 },
                        { latitude: 39.95047911318505, longitude: -75.19268582410943 },
                        { latitude: 39.95179093109073, longitude: -75.20304370847883 },
                        { latitude: 39.954847998114786, longitude: -75.20245124315579 },
                        { latitude: 39.955191716924325, longitude: -75.20444462794761 }
                    ]}
                    strokeColor={pathColor}
                    strokeWidth={pathWidth}
                />
            )}

            {clickedCard?.id === '2' && (
                <Polyline
                    coordinates={[
                        { latitude: 39.948640, longitude: -75.193059 },
                        { latitude: 39.9512442758452, longitude: -75.19253505782692 },
                        { latitude: 39.951338048954135, longitude: -75.19324621574306 },
                        { latitude: 39.95167262958999, longitude: -75.19321576545232 },
                        { latitude: 39.95195132274006, longitude: -75.19440243766566 },
                        { latitude: 39.952691527836926, longitude: -75.20043204349874 },
                        { latitude: 39.95358798772387, longitude: -75.2010221294471 },
                        { latitude: 39.95362088511089, longitude: -75.2017195037497 },
                        { latitude: 39.95397453102205, longitude: -75.20175169025599 },
                        { latitude: 39.95405677399515, longitude: -75.20249197990029 },
                        { latitude: 39.954870974092685, longitude: -75.20237396271062 },
                        { latitude: 39.955191716924325, longitude: -75.20444462794761 }
                    ]}
                    strokeColor={pathColor}
                    strokeWidth={pathWidth}
                />
            )}

            {clickedCard?.id === '3' && (
                <Polyline
                    coordinates={[
                        { latitude: 39.948640, longitude: -75.193059 },
                        { latitude: 39.95435010831815, longitude: -75.19181457734419 },
                        { latitude: 39.95594102983853, longitude: -75.20477593224 },
                        { latitude: 39.955194100332186, longitude: -75.20492774302501 },
                        { latitude: 39.955191716924325, longitude: -75.20444462794761 }
                    ]}
                    strokeColor={pathColor}
                    strokeWidth={pathWidth}
                />
            )}

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

export default function RouteSelectionScreen() {
    // sets up routing
    const router = useRouter();
    // key modal state
    const [showKey, setShowKey] = useState(false);
    // set up expanded card
    const [expandedCard, setExpandedCard] = React.useState<Path | null>(null);
    // set up clickable card
    const [clickedCard, setClickedCard] = React.useState<Path>(paths[0]);
    // state for search bar
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.mapBackground}>
                    <RouteMap clickedCard={clickedCard} />
                    <SearchWrapper
                        value={"4050 Sansom St"}
                        onChangeText={setSearchQuery}
                        showClearButton={false}
                    />
                    <View style={styles.cardPanel}>
                        <View style={styles.panelHeader}>
                            <TouchableOpacity onPress={() => setShowKey(true)}>
                                <Text style={styles.keyText}>Key</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { expandedCard ? setExpandedCard(null) : router.back() }}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>

                        </View>

                        {expandedCard ? (
                            <View style={styles.expandedCard}>
                                <Text style={styles.routeTitle}>{expandedCard.title}</Text>
                                <View style={[styles.label, { backgroundColor: expandedCard.color }]}>
                                    <Text style={styles.labelText}>{expandedCard.label}</Text>
                                </View>
                                <Text style={styles.routeTime}>{expandedCard.duration}</Text>
                                <Text style={styles.routeInfo}>{expandedCard.info}</Text>
                                <TouchableOpacity
                                    style={[styles.startButton, { backgroundColor: expandedCard.buttonColor }]}
                                    onPress={() => {
                                        if (expandedCard?.id === '1') {
                                            router.push('/routeId');
                                        } else if (expandedCard?.id === '2') {
                                            router.push('/routeFast');
                                        } else if (expandedCard?.id === '3') {
                                            router.push('/routeSlow');
                                        }
                                    }}
                                >
                                    <Text style={styles.startButtonText}>Start</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <FlatList
                                data={paths}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => setClickedCard(item)}
                                        activeOpacity={0.99}
                                        style={[
                                            styles.routeCard,
                                            clickedCard?.id === item.id && styles.highlightedRouteCard,
                                        ]}
                                    >
                                        <View>
                                            <Text style={styles.routeTitle}>{item.title}</Text>
                                            <Text style={styles.routeTime}>{item.duration}</Text>
                                        </View>

                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity onPress={() => setExpandedCard(item)} activeOpacity={0.8}>
                                                <View style={[styles.label, { backgroundColor: item.color, flexDirection: 'row', alignItems: 'center' }]}>
                                                    <Text style={styles.labelText}>{item.label}</Text>
                                                    <Ionicons name="chevron-forward" size={12} color="white" style={{ marginLeft: 1 }} />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.startButton, { backgroundColor: item.buttonColor }]}
                                                onPress={() => {
                                                    if (item.id === '1') {
                                                        router.push('/routeId');
                                                    } else if (item.id === '2') {
                                                        router.push('/routeFast');
                                                    } else if (item.id === '3') {
                                                        router.push('/routeSlow');
                                                    }
                                                }}
                                            >
                                                <Text style={styles.startButtonText}>Start</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
                    {showKey && (
                        <TouchableWithoutFeedback onPress={() => setShowKey(false)}>
                            <View style={styles.keyModalOverlay}>
                                <View style={styles.keyModal}>
                                    <Text style={styles.keyTitle}>Score Key</Text>
                                    <Text style={styles.keyItem}>🟢 8–10: Very Safe</Text>
                                    <Text style={styles.keyItem}>🟡 4–7: Moderate Risk</Text>
                                    <Text style={styles.keyItem}>🔴 1–3: High Risk</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    mapBackground: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-start',
    },
    searchInput: {
        color: '#fff',
        fontSize: 16,
    },
    cardPanel: {
        backgroundColor: '#363636',
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    cancelButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    cancelText: {
        color: '#aaa',
        fontSize: 16,
    },
    keyText: {
        color: '#aaa',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    routeCard: {
        backgroundColor: '#252525',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    highlightedRouteCard: {
        borderColor: '#ccc',
        borderWidth: 1,
    },
    routeTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    routeTime: {
        color: '#aaa',
        marginTop: 4,
    },
    routeInfo: {
        color: '#aaa',
        margin: 4,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    label: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        elevation: 5, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    labelText: {
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
    },
    startButton: {
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 20,
    },
    startButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    panelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    expandedCard: {
        backgroundColor: '#252525',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
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
    keyModalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 200,
    },

    keyModal: {
        backgroundColor: '#252525',
        padding: 20,
        borderRadius: 12,
        width: '80%',
    },

    keyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },

    keyItem: {
        fontSize: 14,
        color: '#ccc',
        marginBottom: 6,
    },
});
