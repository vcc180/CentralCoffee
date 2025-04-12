import React, { useState } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { TextInput, StyleSheet, Image, Button, Pressable, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter, Link } from 'expo-router';
import { signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { auth } from "@/app/firebaseConfig";


export default function SignIn() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const handleLogin = async () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            router.replace('/(tabs)/');
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <ThemeProvider>
            <ThemedView style={styles.content}>
                <ThemedText style={{ height: 50, paddingTop: 150, backgroundColor: '#ebddca', paddingBottom: 150, }}>
                    <Image style={styles.logo} source={require('@/assets/images/LogoCentralCoffee.png')} />
                </ThemedText>
                <ThemedView style={styles.form}>
                    <TextInput style={styles.inputText} name="email" placeholder="E-mail" onChangeText={setEmail} />
                    <TextInput style={styles.inputText} secureTextEntry name="password" placeholder="Password" passwordRules='*' onChangeText={setPassword} />
                    
                    <ThemedText style={{ marginBottom: 15}}>Esqueci minha senha.</ThemedText>
                    
                    <Button title="Login" onPress={handleLogin} color={"#432614"} />

                    <ThemedText style={{ marginTop: 15, textAlign: 'center' }}>Ou faça login com</ThemedText>
                    <ThemedView style={{ flexDirection: 'row', backgroundColor: 'none', marginTop: 10, alignSelf: 'center' }}>
                        {/* <GoogleLoginButton /> */}
                        {/* <Pressable style={styles.bLogins}><IconFontAwesome name={"facebook"} /></Pressable> */}
                    </ThemedView>
                </ThemedView>

                <ThemedView style={{ backgroundColor: '#432614', flex: 1 }}>
                    <ThemedText style={{ color: 'white', alignSelf: 'center', margin: 'auto', padding: 20,textAlign:'center' }}>Ainda não tem uma conta no Central Coffee? <Link style={{ fontWeight: 'bold',textDecorationLine: 'underline' }} href="(Pages)/SighUp">Faça seu cadastro!</Link></ThemedText>
                </ThemedView>
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
        borderColor: "#CCC",
        marginBottom: 10,
        borderRadius: 5,
        padding: 12,
    },
    logo: {
        width: 250,
        height: 87,
        alignSelf: "center",
    },
    bSighUp: {
        backgroundColor: '#ebddca',
    },
    bLogins: {
        padding: 15,
        backgroundColor: 'white',
        margin: 5,
    }
})