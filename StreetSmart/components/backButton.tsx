import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type BackButtonProps = {
    style?: ViewStyle;
};

export default function BackButton({ style }: BackButtonProps) {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={[styles.backButton, style]}
            onPress={() => router.back()}
        >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        width: 50,
        height: 50,
        backgroundColor: '#3c3c3c',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});