import { View, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { FONTFAMILY, FONTSIZE } from '../Utils/Font';
import { COLORS } from '../Utils/COLORS';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, Select } from 'native-base';

const { width } = Dimensions.get("window");

const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'tamil', value: 'ta' },
];
export default function Header({ onLanguageChange }) {
    const [languagePair, setLanguagePair] = useState({ source: 'ta', target: 'en' });

    const toggleLanguage = () => {
        setLanguagePair(prev => {
            const newPair = {
                source: prev.target,
                target: prev.source
            };
            onLanguageChange(newPair.source, newPair.target);
            return newPair;
        });
    };

    const handleSourceLanguageChange = (value) => {
        setLanguagePair(prev => {
            const newPair = { ...prev, source: value };
            onLanguageChange(newPair.source, newPair.target); 
            return newPair;
        });
    };

    const handleTargetLanguageChange = (value) => {
        setLanguagePair(prev => {
            const newPair = { ...prev, target: value };
            onLanguageChange(newPair.source, newPair.target); 
            return newPair;
        });
    };

    return (
        <View style={styles.headerContainer}>
            <Box style={styles.box}>
                <Select
                    selectedValue={languagePair.source}
                    minWidth={120}
                    accessibilityLabel="Select source language"
                    placeholder="Select source language"
                    onValueChange={handleSourceLanguageChange}
                    _selectedItem={{
                        bg: COLORS.PRIMARY_LIGHT,
                        endIcon: <MaterialIcons name="check" size={24} color={COLORS.WHITE} />,
                    }}
                    style={styles.select}
                >
                    {languageOptions.map(option => (
                        <Select.Item label={option.label} value={option.value} key={option.value} />
                    ))}
                </Select>
            </Box>
            <TouchableOpacity onPress={toggleLanguage} style={styles.toggleButton}>
                <MaterialIcons name="change-circle" size={40} color={COLORS.PRIMARY_LIGHT} />
            </TouchableOpacity>
            <Box style={[styles.box, styles.targetBox]}>
                <Select
                    selectedValue={languagePair.target}
                    minWidth={120}
                    accessibilityLabel="Select target language"
                    placeholder="Select target language"
                    onValueChange={handleTargetLanguageChange}
                    _selectedItem={{
                        bg: COLORS.PRIMARY_LIGHT,
                        endIcon: <MaterialIcons name="check" size={24} color={COLORS.WHITE} />,
                    }}
                    style={styles.select}
                >
                    {languageOptions.map(option => (
                        <Select.Item label={option.label} value={option.value} key={option.value} />
                    ))}
                </Select>
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.WHITE,
        borderRadius: 30,
        padding: 10,
        width: width * 0.85,
        alignItems: 'center', 
    },
    box: {
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: COLORS.LIGHT_GRAY,
    },
    targetBox: {
        backgroundColor: COLORS.PRIMARY_LIGHT,
    },
    select: {
        color: COLORS.BLACK,
        fontSize: FONTSIZE.TEXT,
        padding: 10,
        width: 120,
    },
    toggleButton: {
        alignSelf: 'center',
    }
});
