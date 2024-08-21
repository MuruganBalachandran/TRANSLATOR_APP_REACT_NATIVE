import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../Utils/COLORS';
import Collapsible from 'react-native-collapsible';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { FONTFAMILY, FONTSIZE } from '../../Utils/Font';

const { width, height } = Dimensions.get('window');

const privacyPolicies = [
  { 
    title: "Data Collection",
    content: "We collect data to provide better services and improve user experience. This includes personal information such as name, email address, and usage data. Our goal is to ensure the app functions smoothly and efficiently. We also collect feedback to enhance our features and address user concerns."
  },
  { 
    title: "Data Usage",
    content: "Data is used to enhance the user experience by personalizing content and improving app functionality. We use data to analyze user behavior, identify trends, and make data-driven decisions. Your information helps us tailor our services to better meet your needs and preferences."
  },
  { 
    title: "Data Security",
    content: "We take data security seriously and use encryption to protect your information. Access to your data is restricted to authorized personnel only. We employ industry-standard security practices to safeguard against unauthorized access, data breaches, and other potential threats."
  },
  { 
    title: "Third-Party Services",
    content: "We may use third-party services that have their own privacy policies. These services help us in areas such as analytics, payment processing, and customer support. We ensure that these third parties adhere to similar privacy and security standards to protect your information."
  },
  { 
    title: "Cookies",
    content: "Cookies are used to improve your experience on our app by storing preferences and tracking usage patterns. They help us remember your settings and provide a more personalized experience. You can manage cookie settings through your device's browser settings."
  },
  { 
    title: "User Rights",
    content: "You have the right to access, modify, and delete your data. You can request a copy of your data or request that we delete your information by contacting us through the app or our website. We will respond to your requests in accordance with applicable laws and regulations."
  },
  { 
    title: "Changes to Policy",
    content: "We may update our privacy policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised effective date. We encourage you to review the policy periodically to stay informed about how we are protecting your information."
  },
  { 
    title: "Contact Us",
    content: "If you have any questions or concerns about our privacy policy, please feel free to contact us through the app or our website. We are here to assist you and address any issues you may have. Your feedback is important to us, and we strive to provide excellent support."
  },
];

export default function PrivacyPolicy({ setPrivacyModalVisible }) {
  const [collapsed, setCollapsed] = useState(null);
  const heightAnim = useSharedValue(0);

  const toggleCollapse = (index) => {
    if (collapsed === index) {
      heightAnim.value = withSpring(0, { damping: 1, stiffness: 100 });
      setCollapsed(null);
    } else {
      heightAnim.value = withSpring(180, { damping: 1, stiffness: 100 });
      setCollapsed(index);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: heightAnim.value,
      overflow: 'hidden',
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Privacy Policy</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {privacyPolicies.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.accordionHeader}
                onPress={() => toggleCollapse(index)}
              >
                <Text style={styles.headerText}>{item.title}</Text>
              </TouchableOpacity>
              <Collapsible collapsed={collapsed !== index} onToggle={() => animatedStyle}>
                <Animated.View style={[styles.accordionContent, animatedStyle]}>
                  <Text style={styles.content}>{item.content}</Text>
                </Animated.View>
              </Collapsible>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setPrivacyModalVisible(false)}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
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
    height: height * 0.7,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between', // Ensure there's space between content and close button
  },
  title: {
    fontFamily: FONTFAMILY.BOLD,
    color: COLORS.BLACK,
    fontSize: FONTSIZE.TITLE,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  accordionHeader: {
    padding: 10,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 5,
    marginBottom: 5,
    justifyContent: 'center', // Center align text vertically
  },
  headerText: {
    fontFamily: FONTFAMILY.BOLD,
    color: COLORS.BLACK,
    fontSize: FONTSIZE.SUB_TITLE,
  },
  accordionContent: {
    padding: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    marginBottom: 10,
  },
  content: {
    fontFamily: FONTFAMILY.REGULAR,
    color: COLORS.BLACK,
    fontSize: FONTSIZE.PARAGRAPH,
    width: width * 0.75,
    textAlign: "left",
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: COLORS.RED,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color:COLORS.WHITE,
    fontSize:FONTSIZE.TEXT,
    fontFamily:FONTFAMILY.REGULAR
  },
});
