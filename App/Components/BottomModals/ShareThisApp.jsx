import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../Utils/COLORS';
import { FONTFAMILY, FONTSIZE } from '../../Utils/Font';

const { width, height } = Dimensions.get('window');

export default function ShareThisApp({ setShareModalVisible }) {
  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Translator App</Text>
          <Text style={styles.subtitle}>
            Share this amazing translator app with your friends and help them break down language barriers!
          </Text>
        </View>
        <View style={styles.shareSection}>
          <FontAwesome name="share-alt" size={50} color={COLORS.PRIMARY} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShareModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => {
              // Handle share action here
              console.log('Share action');
            }}
          >
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor:COLORS.WHITE,
    borderRadius: 10,
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  fontFamily:FONTFAMILY.BOLD,
  fontSize:FONTSIZE.TITLE,
  color:COLORS.BLACK,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.GRAY,
    fontSize:FONTSIZE.PARAGRAPH,
    fontFamily:FONTFAMILY.REGULAR
  },
  shareSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: COLORS.RED,
    borderRadius: 5,
    marginRight: 10,
  },
  shareButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 5,
  },
  buttonText: {
    color:COLORS.WHITE,
    fontSize:FONTSIZE.TEXT,
    fontFamily:FONTFAMILY.REGULAR
  },
});
