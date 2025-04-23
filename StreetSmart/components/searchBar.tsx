import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
    value: string;
    showClearButton?: boolean;
    onChangeText: (text: string) => void;
    placeholder?: string;
    style?: ViewStyle;
};

export default function SearchBar({
    value,
    onChangeText,
    placeholder = 'Where To?',
    style,
    showClearButton
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
            {showClearButton && value.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText('')}>
                    <Ionicons name="close" size={16} color="#ccc" style={styles.clearIcon} />
                </TouchableOpacity>
            )}
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
    clearIcon: {
        marginLeft: 10,
    },
});