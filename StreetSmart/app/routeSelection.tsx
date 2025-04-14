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
import { Marker, Polygon, Polyline } from 'react-native-maps';

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

// create the hard coded routes 
const pathes: Path[] = [
    {
        id: '1',
        title: 'Best Route',
        duration: '18 mins',
        label: '9',
        color: '#4CAF50', // green
        buttonColor: '#2979FF',
        info: 'This route takes a slight detour but avoids an area that had gunshots (2) and robberies (1) in the past hour.',
    },
    {
        id: '2',
        title: 'Route 2',
        duration: '30 mins',
        label: '2',
        color: '#F44336', // red
        buttonColor: '#2979FF',
        info: 'This route takes the most direct path to the destination. However, on the way there, it passes through an area that had gunshots (2) and robberies (1) in the past hour.',
    },
    {
        id: '3',
        title: 'Route 3',
        duration: '43 mins',
        label: '5',
        color: '#FFC107', // amber
        buttonColor: '#2979FF',
        info: 'This route takes a slight detour. The area it passes through has no recent crime reported, but historically has had crime.',
    },
];

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
            <Marker coordinate={{ latitude: 39.949, longitude: -75.194 }} />

            {/* Destination marker: 4050 Sansom */}
            <Marker coordinate={{ latitude: 39.954178, longitude: -75.202984 }} />

            {clickedCard?.id === '1' && (
                <Polyline
                    coordinates={[
                        { latitude: 39.949, longitude: -75.194 },
                        { latitude: 39.95504005198623, longitude: -75.19424563042115 }, // Rose's Florist
                        { latitude: 39.954178, longitude: -75.202984 },
                    ]}
                    strokeColor="#2DFE54"
                    strokeWidth={2}
                />
            )}

            {clickedCard?.id === '2' && (
                <Polyline
                    coordinates={[
                        { latitude: 39.949, longitude: -75.194 },
                        { latitude: 39.954178, longitude: -75.202984 },
                    ]}
                    strokeColor="blue"
                    strokeWidth={2}
                />
            )}

            {clickedCard?.id === '3' && (
                <Polyline
                    coordinates={[
                        { latitude: 39.949, longitude: -75.194 },
                        { latitude: 39.95177484394833, longitude: -75.20332219092202 }, // Allegro Pizza
                        { latitude: 39.954178, longitude: -75.202984 },
                    ]}
                    strokeColor="orange"
                    strokeWidth={2}
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
    // set up expanded card
    const [expandedCard, setExpandedCard] = React.useState<Path | null>(null);
    // set up clickable card
    const [clickedCard, setClickedCard] = React.useState<Path | null>(null);
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
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

                    <View style={styles.cardPanel}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => { expandedCard ? setExpandedCard(null) : router.back() }}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

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
                                    onPress={() => router.push('/routeId')}
                                >
                                    <Text style={styles.startButtonText}>Start</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <FlatList
                                data={pathes}
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
                                            <TouchableOpacity
                                                style={[styles.label, { backgroundColor: item.color }]}
                                                onPress={() => setExpandedCard(item)}>
                                                <Text style={styles.labelText}>{item.label}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.startButton, { backgroundColor: item.buttonColor }]}
                                                onPress={() => router.push('/routeId')}
                                            >
                                                <Text style={styles.startButtonText}>Start</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
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
    },
    labelText: {
        color: 'white',
        fontWeight: 'bold',
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
    expandedCard: {
        backgroundColor: '#252525',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
