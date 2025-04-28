import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Path = {
    id: string;
    title: string;
    duration: string;
    label: string;
    color: string;
    buttonColor: string;
    info: string;
};

const paths: Path[] = [
    {
        id: '1',
        title: 'Best Route',
        duration: '20 mins, 1.0 mi',
        label: '9',
        color: '#4CAF50',
        buttonColor: '#2979FF',
        info: 'This route takes a slight detour but avoids an area that had gunshots (2) and robberies (1) in the past hour.',
    },
    {
        id: '2',
        title: 'Shortest Route',
        duration: '18 mins, 0.85 mi',
        label: '2',
        color: '#F44336',
        buttonColor: '#2979FF',
        info: 'This route takes the most direct path but passes through an area with recent gunshots and robberies.',
    },
    {
        id: '3',
        title: 'Longest Route',
        duration: '30 mins, 1.5 mi',
        label: '5',
        color: '#FFC107',
        buttonColor: '#2979FF',
        info: 'This route takes a slight detour. The area it passes through has no recent crime reported, but historically has had crime.',
    },
];

type Props = {
    onCancel: () => void;
    onSelectRoute: (id: string) => void;
};

const RouteSelectionCard: React.FC<Props> = ({ onCancel, onSelectRoute }) => {
    const router = useRouter();
    const [expandedCard, setExpandedCard] = useState<Path | null>(null);
    const [clickedCard, setClickedCard] = useState<Path>(paths[0]);
    const [showKey, setShowKey] = useState(false);

    return (
        <>
            <View style={styles.panel}>
                <View style={styles.panelHeader}>
                    <TouchableOpacity onPress={() => setShowKey(true)}>
                        <Text style={styles.keyText}>Key</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => expandedCard ? setExpandedCard(null) : onCancel()}>
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
                                if (expandedCard.id === '1') {
                                    router.push('/routeId');
                                } else if (expandedCard.id === '2') {
                                    router.push('/routeFast');
                                } else if (expandedCard.id === '3') {
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
                                onPress={() => {
                                    setClickedCard(item);
                                    onSelectRoute(item.id);
                                }}
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

            {/* Key Modal */}
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
        </>
    );
};

export default RouteSelectionCard;

const styles = StyleSheet.create({
    panel: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#363636',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    keyText: {
        color: '#aaa',
        fontSize: 16,
        textDecorationLine: 'underline',
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
        elevation: 5,
        shadowColor: '#000',
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
        backgroundColor: '#2979FF',
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
    routeInfo: {
        color: '#aaa',
        margin: 4,
        textAlign: 'center',
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
