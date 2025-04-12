import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import SearchBar from './searchBar';
import BackButton from './backButton';

type SearchSectionProps = {
    value: string;
    onChangeText: (text: string) => void;
    style?: ViewStyle;
};

export default function SearchWrapper({ value, onChangeText, style }: SearchSectionProps) {
    return (
        <View style={[styles.searchWrapper, style]}>
            <SearchBar value={value} onChangeText={onChangeText} />
            <BackButton />
        </View>
    );
}

const styles = StyleSheet.create({
    searchWrapper: {
        flexDirection: 'column',
        width: '90%',
        gap: 10,
        marginVertical: 60,
        alignSelf: 'center',
    },
});
