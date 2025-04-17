import React, { useState } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { TextInput, StyleSheet, Image, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter, Link } from 'expo-router';
import { signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { auth } from "@/app/firebaseConfig";
import { FirebaseMessage } from "@/components/FirebaseMessage";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import { useFonts } from 'expo-font';
import { IconAntDesign } from "@/components/ui/IconSymbolAwesome";

const schema = yup.object({
    username: yup.string().email('E-mail inválido.').required("Informe seu e-mail."),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 digitos.").required("Informe sua senha.")
})



export default function SignIn() {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })


    const handleLogin = async (data) => {
        signInWithEmailAndPassword(auth, data.username, data.password).then(() => {
            // router.replace('/(tabs)/');
        }).catch(error => {
            alert(FirebaseMessage(error.code));
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
                                style={[
                                    styles.inputText,
                                    {
                                        borderColor: errors.username && '#ff375b',
                                    }
                                ]}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                placeholder=""
                            />
                        )}
                    />
                    {errors.username && <ThemedText style={styles.labelError}>{errors.username.message}</ThemedText>}
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
                                secureTextEntry={true}
                            />
                        )}
                    />
                    {errors.password && <ThemedText style={styles.labelError}>{errors.password.message}</ThemedText>}
                    <ThemedText style={styles.labelRecuperar}><Link href="(auth)/recover">Recuperar senha.</Link></ThemedText>
                    <Button title="Logar" color={'#432614'} onPress={handleSubmit(handleLogin)} />
                </ThemedView>
                <ThemedView style={{backgroundColor: '', flexDirection: 'column'}}>
                    <ThemedText style={[styles.label,{textAlign:'center'}]}>Ou faça login com</ThemedText>
                    <ThemedView style={{backgroundColor: '', flexDirection: 'row',alignItems: 'center', margin: 'auto', marginTop: 15,}}>
                        <IconAntDesign color={'#432614'} size={26} style={{padding: 5}} name={'google'}/>
                        <IconAntDesign color={'#432614'} size={26} style={{padding: 5}} name={'instagram'}/>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
            <ThemedView style={{ backgroundColor: '#432614', height: 100 }}>
                <ThemedText style={{ color: 'white', alignSelf: 'center', fontSize: 14, margin: 'auto', padding: 20, textAlign: 'center', fontFamily: 'RobotoRegular' }}>Ainda não tem uma conta no Central Coffee?{"\n"} <Link style={{ fontWeight: 'bold', textDecorationLine: 'underline' }} href="/(auth)/signUp">Faça seu cadastro!</Link></ThemedText>
            </ThemedView>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#ebddca",
        flex: 1,
        fontFamily: 'RobotoRegular',
    },
    form: {
        backgroundColor: "#ebddca",
        padding: 50,
        fontFamily: 'Roboto',
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
    labelError: {
        color: 'red',
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