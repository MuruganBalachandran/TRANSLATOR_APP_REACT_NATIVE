import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Alert, ScrollView } from 'react-native';
import { COLORS } from '../Utils/COLORS';
import { USER_DATA } from '../Data/UserData';
import { FONTFAMILY, FONTSIZE } from '../Utils/Font';
import { Select, Box, CheckIcon, NativeBaseProvider, Modal, Center } from 'native-base';
import EditDetails from '../Components/Settings/EditDetails';


const { width } = Dimensions.get('window');

const themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
];

const locationOptions = [
    { label: 'United States', value: 'us' },
    { label: 'India', value: 'in' },
    { label: 'France', value: 'fr' },
    { label: 'Spain', value: 'es' },
];

const SettingsScreen = ({ navigation }) => {
    const [editModal, setEditModal] = useState(false);
    const [theme, setTheme] = useState('light');
    const [location, setLocation] = useState('us');
    const [username, setUsername] = useState(USER_DATA.name);
    const [email, setEmail] = useState(USER_DATA.gmail);

    const handleSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Sign Out Cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        console.log('Signed out');
                    },
                },
            ],
            { cancelable: false }
        );
    };
    
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                {/* Header section */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.drawerButton}>
                        <Image
                            style={styles.drawerImage}
                            source={require('../../assets/images/drawer.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: FONTSIZE.TITLE, color: COLORS.BLACK, fontFamily: FONTFAMILY.BOLD }}>Settings</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>Account</Text>
                    <View style={styles.userInfoContainer}>
                        <Image source={USER_DATA.image} style={styles.profileImage} />
                        <Text style={styles.username}>Username: {username}</Text>
                        <Text style={styles.email}>Gmail: {email}</Text>
                        <TouchableOpacity
                            onPress={() => { setEditModal(true); }}
                            style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit Details</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>App</Text>
                    <View style={styles.settingsContainer}>
                        <Text style={styles.subTitle}>Theme</Text>
                        <Box style={styles.selectBox}>
                            <Select
                                selectedValue={theme}
                                minWidth="200"
                                accessibilityLabel="Select Theme"
                                placeholder="Select Theme"
                                _selectedItem={{
                                    bg: COLORS.PRIMARY_LIGHT,
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                onValueChange={(itemValue) => setTheme(itemValue)}
                                style={styles.select}
                            >
                                {themeOptions.map(option => (
                                    <Select.Item label={option.label} value={option.value} key={option.value} />
                                ))}
                            </Select>
                        </Box>

                        <Text style={styles.subTitle}>Location</Text>
                        <Box style={styles.selectBox}>
                            <Select
                                selectedValue={location}
                                minWidth="200"
                                accessibilityLabel="Select Location"
                                placeholder="Select Location"
                                _selectedItem={{
                                    bg: COLORS.PRIMARY_LIGHT,
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                onValueChange={(itemValue) => setLocation(itemValue)}
                                style={styles.select}
                            >
                                {locationOptions.map(option => (
                                    <Select.Item label={option.label} value={option.value} key={option.value} />
                                ))}
                            </Select>
                        </Box>
                    </View>
                    <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomLeftContainer}>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>About Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>Contact Us</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
                    <Center style={{flex:1}}>
                    <EditDetails 
                        isOpen={editModal} 
                        onClose={() => setEditModal(false)} 
                        setUsername={setUsername} 
                    />
                    </Center>
                 
                </Modal>
            </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    headerContainer: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 20,
        padding: 10,
        paddingBottom: 20,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: COLORS.WHITE,
        elevation: 6,
    },
    drawerButton: {
        marginRight: 10,
    },
    drawerImage: {
        width: width * 0.085,
        height: width * 0.085,
    },
    scrollContainer: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: FONTSIZE.SUB_TITLE,
        fontFamily: FONTFAMILY.BOLD,
        color: COLORS.BLACK,
        marginVertical: 10,
    },
    userInfoContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: width * 0.4,
        height: width * 0.4,
        borderRadius: 99,
        marginBottom: 10,
    },
    username: {
        fontSize: FONTSIZE.SUB_TITLE,
        fontFamily: FONTFAMILY.BOLD,
        color: COLORS.BLACK,
    },
    email: {
        fontSize: FONTSIZE.TEXT,
        fontFamily: FONTFAMILY.REGULAR,
        color: COLORS.BLACK,
        marginVertical: 10,
    },
    editButton: {
        backgroundColor: COLORS.BLUE,
        borderRadius: 20,
        padding: 10,
        marginVertical: 10,
    },
    editButtonText: {
        color: COLORS.WHITE,
        fontSize: FONTSIZE.SUB_TITLE,
        fontFamily: FONTFAMILY.REGULAR,
    },
    settingsContainer: {
        marginVertical: 20,
    },
    subTitle: {
        fontSize: FONTSIZE.SUB_TITLE,
        fontFamily: FONTFAMILY.REGULAR,
        color: COLORS.BLACK,
        marginVertical: 10,
    },
    selectBox: {
        backgroundColor: COLORS.LIGHT_GRAY,
        borderRadius: 5,
        marginVertical: 10,
    },
    select: {
        fontSize: FONTSIZE.TEXT,
        color: COLORS.BLACK,
    },
    bottomLeftContainer: {
        marginVertical: 20,
    },
    buttonText: {
        fontSize: FONTSIZE.SUB_TITLE,
        color: COLORS.BLUE,
        fontFamily: FONTFAMILY.REGULAR,
        marginBottom: 10,
    },
    signOutButton: {
        backgroundColor: COLORS.RED,
        borderRadius: 29,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 20,
    },
    signOutText: {
        color: COLORS.WHITE,
        fontSize: FONTSIZE.SUB_TITLE,
        fontFamily: FONTFAMILY.BOLD_ITALIC,
    },
});

export default SettingsScreen;
