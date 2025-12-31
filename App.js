import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet, I18nManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from './src/theme/theme';
import { initializeI18n } from './src/locales/i18n';
import { ProfileProvider } from './src/context/ProfileContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { ParentalProvider } from './src/context/ParentalContext';
import AppNavigator from './src/navigation/AppNavigator';

// Force RTL for Arabic
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

/**
 * Main App Content with theme support
 */
const AppContent = () => {
    const { isNightMode, isLoading } = useTheme();

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <>
            <StatusBar style={isNightMode ? 'light' : 'dark'} />
            <AppNavigator />
        </>
    );
};

/**
 * SmartKids Tutor AI - Main App Component
 */
export default function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // Initialize i18n with Arabic as default
                await initializeI18n();
            } catch (e) {
                console.warn('Error initializing app:', e);
            } finally {
                setIsReady(true);
            }
        }

        prepare();
    }, []);

    if (!isReady) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <ThemeProvider>
                <ProfileProvider>
                    <ParentalProvider>
                        <AppContent />
                    </ParentalProvider>
                </ProfileProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background,
    },
});
