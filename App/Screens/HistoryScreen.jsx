import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { COLORS } from '../Utils/COLORS';
import { FONTFAMILY, FONTSIZE } from '../Utils/Font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width } = Dimensions.get("window");

const HistoryScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await AsyncStorage.getItem('HISTORY_DATA');
                if (history) {
                    setHistoryData(JSON.parse(history));
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching history:', error);
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

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
                <Text style={styles.text}>Date: {item.date}</Text>
                <Text style={styles.text}>Time: {item.time}</Text>
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
                <Text style={styles.title}>History</Text>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={styles.iconButton}>
                        <MaterialIcons name="search" size={30} color={COLORS.BLACK} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <MaterialIcons name="filter-list" size={30} color={COLORS.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>

            <Animated.FlatList
                data={historyData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContent}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>No History yet</Text>
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
        backgroundColor: COLORS.PRIMARY_LIGHT
    },
    drawerButton: {
        marginRight: 10,
    },
    drawerImage: {
        width: width * 0.085,
        height: width * 0.085,
    },
    title: {
        color: COLORS.BLACK,
        fontSize: FONTSIZE.TITLE,
        fontFamily: FONTFAMILY.REGULAR,
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
    iconButton: {
        marginHorizontal: 10,
    },
    flatListContent: {
        padding: 20,
        paddingBottom: 100, // Extra padding at the bottom for better UX
    },
});

export default HistoryScreen;
