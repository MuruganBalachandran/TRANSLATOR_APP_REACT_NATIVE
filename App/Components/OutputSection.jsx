import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image, ToastAndroid } from 'react-native';
import { COLORS } from '../Utils/COLORS';
import { FONTFAMILY, FONTSIZE } from '../Utils/Font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");

export default function OutputSection({ translations, addFavorite, sourceLanguage, targetLanguage }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Fetch existing favorites from AsyncStorage when the component mounts
        const fetchFavorites = async () => {
            try {
                const favoritesData = await AsyncStorage.getItem('FAVORITE_DATA');
                if (favoritesData) {
                    setFavorites(JSON.parse(favoritesData));
                }
            } catch (error) {
                console.error('Error fetching favorites from AsyncStorage:', error);
            }
        };
        fetchFavorites();
    }, []);

    const handleDoubleTap = async (item) => {
        // Show toast message
        ToastAndroid.show('Added to Favorites!', ToastAndroid.SHORT);

        // Check if the item is already in favorites
        const isAlreadyFavorited = favorites.some(fav => fav.content === item.input && fav.translatedContent === item.output);
        
        if (!isAlreadyFavorited) {
            // Save to AsyncStorage
            try {
                const newFavorite = {
                    id: favorites.length ? favorites[favorites.length - 1].id + 1 : 0,
                    content: item.input,
                    translatedContent: item.output,
                    originalLanguage: sourceLanguage, // Use sourceLanguage from props
                    translatedLanguage: targetLanguage, // Use targetLanguage from props
                };
                const updatedFavorites = [...favorites, newFavorite];
                setFavorites(updatedFavorites);
                await AsyncStorage.setItem('FAVORITE_DATA', JSON.stringify(updatedFavorites));
            } catch (error) {
                console.error('Error saving to AsyncStorage:', error);
            }
        }
        
        // Save to the passed addFavorite function (if needed for other functionalities)
        addFavorite(item);
    };


    const renderItem = ({ item }) => (
        <GestureHandlerRootView>
            <TapGestureHandler
                numberOfTaps={2}
                onActivated={() => handleDoubleTap(item)}
            >
                <View style={[
                    styles.translationContainer,
                
                ]}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>{item.input}</Text>
                    </View>
                    <View style={styles.outputContainer}>
                        <Text style={styles.text}>{item.output}</Text>
                    </View>
                </View>
            </TapGestureHandler>
        </GestureHandlerRootView>
    );

    return (
        <FlatList
            data={translations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                    <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
                    <Text style={styles.emptyText}>Let's translate something new</Text>
                </View>
            )}
        />
    );
}


const styles = StyleSheet.create({
    inputContainer: {
        alignItems: "flex-start",
        alignSelf: "flex-start",
        margin: 10,
        backgroundColor: COLORS.WHITE,
        padding: 10,
        borderRadius: 15,
    },
    outputContainer: {
        alignSelf: "flex-end",
        margin: 10,
        backgroundColor: COLORS.WHITE,
        padding: 10,
        borderRadius: 15,
    },
    text: {
        color: COLORS.BLACK,
        fontFamily: FONTFAMILY.REGULAR,
        fontSize: FONTSIZE.TEXT,
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: height * 0.2,
    },
    logo: {
        width: width * 0.25,
        height: width * 0.25,
        marginBottom: 20,
    },
    emptyText: {
        color: COLORS.WHITE,
        fontSize: FONTSIZE.SUB_TITLE,
        fontFamily: FONTFAMILY.REGULAR,
    },
    translationContainer: {
     
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 15,
    },
    favorited: {
        backgroundColor: COLORS.PRIMARY // Light red background for favorited items
    },
});
