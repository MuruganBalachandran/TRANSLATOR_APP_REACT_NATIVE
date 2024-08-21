import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import AppNavigation from './App/Navigation/AppNavigation';
import { COLORS } from './App/Utils/COLORS';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NativeBaseProvider>
                <StatusBar backgroundColor={COLORS.PRIMARY_LIGHT} barStyle={"light-content"} />
                <AppNavigation />
            </NativeBaseProvider>
        </GestureHandlerRootView>
    );
}
