import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS } from '../Utils/COLORS';
import { FONTFAMILY, FONTSIZE } from '../Utils/Font';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withSpring } from 'react-native-reanimated';


const { width, height } = Dimensions.get("window");

export default function SplashScreen() { 
    const navigation = useNavigation();
    const squareHeight = useSharedValue(width * 0.4);
    const squareWidth = useSharedValue(width * 0.4);

    useEffect(() => {
      squareHeight.value = withTiming(height, {
            duration: 800,
            easing: Easing.linear,
        });
        squareWidth.value = withTiming(width, {
          duration: 800,
          easing: Easing.linear,
      });

        const timeout = setTimeout(() => {
            navigation.navigate("DrawerNavigation");
        }, 2000);

        return () => clearTimeout(timeout);
    }, [squareHeight, squareWidth, navigation]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: squareWidth.value,
            height: squareHeight.value,
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[
                animatedStyle,
                {
                    backgroundColor: COLORS.PRIMARY_LIGHT,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center"
                }
            ]}>
                          <Image source={require("../../assets/images/logo.png")} style={{width:width*0.25,height:width*0.25}}/>
                <Text style={styles.title}>Translator</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: FONTSIZE.TITLE,
        fontFamily: FONTFAMILY.BOLD,
        color: COLORS.BLACK
    }
});
