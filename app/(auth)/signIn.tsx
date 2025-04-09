import React, { useState } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { TextInput, StyleSheet, Image, Button, Pressable, Alert } from "react-native";

export default function SignIn(){
    return(
        <ThemeProvider>
            <ThemedView style={styles.content}>
                
            </ThemedView>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#ebddca",
        flex: 1,
    },
})