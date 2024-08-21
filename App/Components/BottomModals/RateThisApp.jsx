import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../Utils/COLORS';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FONTFAMILY, FONTSIZE } from '../../Utils/Font';

const { width,height } = Dimensions.get('window');

export default function RateThisApp({ setRateModalVisible }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleStarPress = (star) => {
    setRating(star);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          <FontAwesome
            name={i <= rating ? 'star' : 'star-o'}
            size={32}
            color={i <= rating ? COLORS.PRIMARY : COLORS.GRAY}
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleSubmit = () => {
    // Handle the submission of the rating and review
    console.log('Rating:', rating);
    console.log('Review:', review);
    setRateModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Rate This App</Text>
        <View style={styles.starsContainer}>
          {renderStars()}
        </View>
        <TextInput
          placeholder="Write your review here..."
          value={review}
          onChangeText={setReview}
          style={styles.textInput}
          multiline
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setRateModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Save</Text>
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize:FONTSIZE.SUB_TITLE,
    fontFamily:FONTFAMILY.BOLD,
    color:COLORS.BLACK,
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  textInput: {
    height: height*0.15,
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    color:COLORS.PRIMARY,
    fontSize:FONTSIZE.PARAGRAPH,
    fontFamily:FONTFAMILY.BOLD
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: COLORS.RED,
    borderRadius: 5,
    marginRight: 10,
  },
  submitButton: {
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
