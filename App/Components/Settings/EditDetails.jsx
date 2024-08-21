import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Modal } from 'native-base';
import { COLORS } from '../../Utils/COLORS';
import { FONTFAMILY, FONTSIZE } from '../../Utils/Font';
import { USER_DATA } from '../../Data/UserData';

const { width } = Dimensions.get('window');

const EditDetails = ({ isOpen, onClose, setUsername }) => {
    const [newUsername, setNewUsername] = useState(USER_DATA.name);

    const handleSave = () => {
        setUsername(newUsername);
        onClose();
    };

    return (
     
            <View style={styles.modalContent}>
                <Text style={styles.title}>Edit Details</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={newUsername}
                    onChangeText={setNewUsername}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
 
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: COLORS.WHITE,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.9,
        alignSelf: 'center',
        marginVertical: '50%',
        elevation: 10,

    },
    title: {
        fontSize: FONTSIZE.TITLE,
        fontFamily: FONTFAMILY.BOLD,
        color: COLORS.BLACK,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderColor: COLORS.LIGHT_GRAY,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        fontSize: FONTSIZE.TEXT,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveButton: {
        backgroundColor: COLORS.BLUE,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: COLORS.RED,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.WHITE,
        fontSize: FONTSIZE.SUB_TITLE,
        fontFamily: FONTFAMILY.BOLD,
    },
});

export default EditDetails;
