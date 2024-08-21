import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../Utils/COLORS';
import { FONTFAMILY, FONTSIZE } from '../Utils/Font';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import OutputSection from '../Components/OutputSection';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
    const [input, setInput] = useState('');
    const [translations, setTranslations] = useState([]);
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('ta');
    const navigation = useNavigation();

    const getPrediction = async () => {
        try {
            const response = await fetch('http://your-port/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    document: input,
                    source_language: sourceLanguage,
                    target_language: targetLanguage,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const newTranslation = { input, output: data.translated_text };
            setTranslations(prev => [...prev, newTranslation]);

            // Save to AsyncStorage
            const history = await AsyncStorage.getItem('HISTORY_DATA');
            const historyData = history ? JSON.parse(history) : [];
            const newEntry = {
                id: historyData.length ? historyData[historyData.length - 1].id + 1 : 0,
                content: input,
                translatedContent: data.translated_text,
                originalLanguage: sourceLanguage,
                translatedLanguage: targetLanguage,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString(),
            };
            await AsyncStorage.setItem('HISTORY_DATA', JSON.stringify([...historyData, newEntry]));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLanguageChange = (newSource, newTarget) => {
        setSourceLanguage(newSource);
        setTargetLanguage(newTarget);
    };

    return (
        <View style={styles.container}>
            {/* Header section */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.drawerButton}>
                    <Image
                        style={styles.drawerImage}
                        source={require('../../assets/images/drawer.png')}
                    />
                </TouchableOpacity>
                <Header onLanguageChange={handleLanguageChange} />
            </View>

            {/* Output section */}
            <View style={styles.outputSection}>
                <OutputSection
                    translations={translations}
                    addFavorite={() => {}}
                    sourceLanguage={sourceLanguage}
                    targetLanguage={targetLanguage}
                />
            </View>

            {/* SearchBar Section */}
            <View style={styles.searchBarContainer}>
                <View style={styles.barContainer}>
                    <TextInput
                        placeholder='Enter here'
                        style={styles.bar}
                        value={input}
                        onChangeText={setInput}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={getPrediction}
                    >
                        <FontAwesome name="send" size={28} color={COLORS.PRIMARY_LIGHT} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    drawerButton: {
        marginRight: 10,
    },
    drawerImage: {
        width: width * 0.085,
        height: width * 0.085,
    },
    outputSection: {
        backgroundColor: COLORS.PRIMARY_LIGHT,
        width: width,
        height: height * 0.75,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 80, // Ensure space for search bar
    },
    searchBarContainer: {
        position: 'absolute',
        bottom: 20,
        width: width,
        paddingHorizontal: 20,
    },
    bar: {
        backgroundColor: COLORS.WHITE,
        padding: 12,
        borderRadius: 20,
        elevation: 6,
        shadowColor: COLORS.BLACK,
        width: '80%',
        color: COLORS.BLACK,
        fontSize: FONTSIZE.TEXT,
        fontFamily: FONTFAMILY.LIGHT,
    },
    barContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    sendButton: {
        backgroundColor: COLORS.WHITE,
        padding: 10,
        borderRadius: 10,
        elevation: 6,
    },
});
