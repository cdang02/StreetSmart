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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// define type of path
type Path = {
    id: string;
    title: string;
    duration: string;
    label: string;
    color: string;
    buttonColor: string;
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
    },
    {
        id: '2',
        title: 'Route 2',
        duration: '30 mins',
        label: '2',
        color: '#F44336', // red
        buttonColor: '#2979FF',
    },
    {
        id: '3',
        title: 'Route 3',
        duration: '43 mins',
        label: '5',
        color: '#FFC107', // amber
        buttonColor: '#2979FF',
    },
];

export default function RouteSelectionScreen() {
    // sets up routing
    const router = useRouter();
    // set up expanded card
    const [expandedCard, setExpandedCard] = React.useState<Path | null>(null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapBackground}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => { router.back() }}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="4050 Samson St"
                        placeholderTextColor="#ccc"
                        style={styles.searchInput}
                    />
                </View>
            </View>

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
                        <TouchableOpacity
                            style={[styles.startButton, { backgroundColor: expandedCard.buttonColor }]}
                        >
                            <Text style={styles.startButtonText}>Start</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={pathes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.routeCard}>
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
                                    >
                                        <Text style={styles.startButtonText}>Start</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    mapBackground: {
        flex: 1,
        backgroundColor: '#2c2c2c', // Dark map placeholder
        justifyContent: 'flex-start',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        backgroundColor: '#3c3c3c',
        borderRadius: 20,
        padding: 10,
        zIndex: 2,
    },
    searchBar: {
        marginTop: 100,
        marginHorizontal: 20,
        backgroundColor: '#3c3c3c',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 50,
        justifyContent: 'center',
    },
    searchInput: {
        color: '#fff',
        fontSize: 16,
    },
    cardPanel: {
        backgroundColor: '#121212',
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        backgroundColor: '#2c2c2c',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        backgroundColor: '#2c2c2c',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
