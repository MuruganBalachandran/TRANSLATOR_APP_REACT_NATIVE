import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, FlatList, Image } from 'react-native';
import { COLORS } from '../Utils/COLORS';
import { FONTFAMILY, FONTSIZE } from '../Utils/Font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Animated, { FadeInUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("window");

const FavoritesScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const favorites = await AsyncStorage.getItem('FAVORITE_DATA');
                const favoritesData = favorites ? JSON.parse(favorites) : [];
                setFilteredData(favoritesData);
                setLoading(false);
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };
        loadFavorites();
    }, []);

    useEffect(() => {
        const newFilteredData = filteredData.filter(item => 
            item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.translatedContent.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(newFilteredData);
    }, [searchQuery]);

    const renderItem = ({ item }) => (
        loading ? (
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                    width={width - 40}
                    height={100}
                    borderRadius={10}
                    marginBottom={20}
                />
            </SkeletonPlaceholder>
        ) : (
            <Animated.View entering={FadeInUp.duration(1000)} style={styles.itemContainer}>
                <Text style={styles.text}>Original: {item.content}</Text>
                <Text style={styles.text}>Translated: {item.translatedContent}</Text>
                <Text style={styles.text}>From: {item.originalLanguage}</Text>
                <Text style={styles.text}>To: {item.translatedLanguage}</Text>
            </Animated.View>
        )
    );

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
                <Text style={styles.title}>Favorites</Text>
                {isSearchVisible ? (
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Favorites..."
                            placeholderTextColor={COLORS.GRAY}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <TouchableOpacity onPress={() => {
                            setIsSearchVisible(false);
                            setSearchQuery('');
                        }} style={styles.cancelButton}>
                            <MaterialIcons name="cancel" size={30} color={COLORS.BLACK} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.headerContent}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={styles.iconButton} onPress={() => setIsSearchVisible(true)}>
                                <MaterialIcons name="search" size={30} color={COLORS.BLACK} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <MaterialIcons name="filter-list" size={30} color={COLORS.BLACK} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
            <Animated.FlatList
                data={filteredData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContent}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>No Favorites yet</Text>
                )}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        paddingBottom: 20,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: COLORS.PRIMARY_LIGHT,
        alignItems: 'center',
    },
    drawerButton: {
        marginRight: 10,
    },
    drawerImage: {
        width: width * 0.085,
        height: width * 0.085,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: COLORS.BLACK,
        fontSize: FONTSIZE.TITLE,
        fontFamily: FONTFAMILY.REGULAR,
    },
    iconButton: {
        marginLeft: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: COLORS.GRAY,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        color: COLORS.BLACK,
    },
    cancelButton: {
        marginLeft: 10,
    },
    itemContainer: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: COLORS.LIGHT_GRAY,
        width: '100%',
    },
    text: {
        color: COLORS.BLACK,
        fontFamily: FONTFAMILY.REGULAR,
        fontSize: FONTSIZE.TEXT,
        marginBottom: 5,
    },
    emptyText: {
        color: COLORS.BLACK,
        fontFamily: FONTFAMILY.LIGHT,
        fontSize: FONTSIZE.SUB_TITLE,
        textAlign: 'center',
        marginTop: 20,
    },
    flatListContent: {
        padding: 20,
        paddingBottom: 100,
    },
});

export default FavoritesScreen;
