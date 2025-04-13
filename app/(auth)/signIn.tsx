import React, { useState } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { TextInput, StyleSheet, Image, Button, Pressable, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter, Link } from 'expo-router';
import { signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { auth } from "@/app/firebaseConfig";
import { useForm, Controller } from "react-hook-form";


export default function SignIn() {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm({

    })

    const handleLogin = async (data) => {
        
        signInWithEmailAndPassword(auth, data.username, data.password).then(() => {
            console.log(data);
            router.replace('/(tabs)/');
        }).catch(error => {
            console.log(error);
        });
    }


    return (
        <ThemeProvider>
            <ThemedView style={styles.content}>
                <Image style={styles.logo} source={require('@/assets/images/LogoCentralCoffee.png')} />
                <ThemedView style={styles.form}>
                    <ThemedText style={styles.label}>E-mail</ThemedText>
                    <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[styles.inputText]}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                placeholder=""
                            />
                        )}
                    />

                    <ThemedText style={styles.label}>Senha</ThemedText>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[styles.inputText]}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                placeholder=""
                            />
                        )}
                    />
                    <ThemedText style={styles.labelRecuperar}>Recuperar senha.</ThemedText>
                    <Button title="Logar" color={'#432614'} onPress={handleSubmit(handleLogin)}/>
                </ThemedView>

            </ThemedView>
            <ThemedView style={{ backgroundColor: '#432614', height:100 }}>
                <ThemedText style={{ color: 'white', alignSelf: 'center', margin: 'auto', padding: 20, textAlign: 'center' }}>Ainda não tem uma conta no Central Coffee? <Link style={{ fontWeight: 'bold', textDecorationLine: 'underline' }} href="(Pages)/SighUp">Faça seu cadastro!</Link></ThemedText>
            </ThemedView>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#ebddca",
        flex: 1,
    },
    form: {
        backgroundColor: "#ebddca",
        padding: 50,
    },
    inputText: {
        color: '#808080',
        backgroundColor: "white",
        borderColor: "#432614",

        borderRadius: 5,
        padding: 10,
        height: 40,
        borderWidth: 1.5,
    },
    label: {
        color: '#432614',
        marginTop: 15,
    },
    labelRecuperar: {
        color: '#432614',
        marginBottom: 15,
    },
    logo: {
        width: 250,
        height: 87,
        alignSelf: "center",
        marginTop: 100,
        marginBottom: 10,
    },

})