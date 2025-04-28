import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

type DestinationCardProps = {
    address: string;
    onClose: () => void;
}

const DestinationCard = ({ address, onClose }: DestinationCardProps) => {
    const router = useRouter(); 1

    return (
        <View style={styles.bottomCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.address}>{address}</Text>
                <TouchableOpacity onPress={onClose} style={styles.iconButton}>
                    <Icon name="close" size={20} color="#ccc" />
                </TouchableOpacity>
            </View>
            <Text style={styles.distance}>1.0 mi away</Text>
            <TouchableOpacity style={styles.selectButton} onPress={() => router.push('/routeSelection')}>
                <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomCard: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#363636',
        borderRadius: 30,
        padding: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    address: {
        fontFamily: 'GolosText',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconButton: {
        padding: 7,
        borderRadius: 30,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    distance: {
        color: '#ccc',
        marginBottom: 16,
    },
    selectButton: {
        backgroundColor: '#006CDF',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
    },
    selectButtonText: {
        fontFamily: 'GolosText',
        color: '#fff',
        fontSize: 16,
    },
});

export default DestinationCard;
