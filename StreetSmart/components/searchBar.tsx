import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    style?: ViewStyle;
};

export default function SearchBar({
    value,
    onChangeText,
    placeholder = 'Where To?',
    style,
}: SearchBarProps) {
    return (
        <View style={[styles.searchContainer, style]}>
            <Ionicons name="search" size={16} color="#ccc" style={styles.searchIcon} />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#ccc"
                style={styles.searchInput}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#363636',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 18,
        alignItems: 'center',
        width: '100%',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
});