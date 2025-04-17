import { Button, Image, StyleSheet, TextInput } from "react-native";
import { useState } from 'react';
import { Checkbox } from 'expo-checkbox';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import { Link } from "expo-router";

const schema = yup.object({
    nome: yup.string().required("Informe seu Nome Completo."),
    CPF: yup.string().required("Informe seu CPF."),
    email: yup.string().required("Informe seu e-mail."),
    password: yup.string().min(8, "A senha deve ter pelo menos 8 digitos.").required("Informe sua senha."),
    repassword: yup.string().min(8, "A senha deve ter pelo menos 8 digitos.").required("Informe sua senha.")
})

export default function SingUp() {
    const [isChecked, setChecked] = useState(false);
    //Formulário
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const handleSignUp = () => {
        console.log('handleSingUp');
        if (!isChecked) alert('Clique em aceito para prosseguir o cadastro.');
    }

    return (
        <ThemedView style={styles.content}>
            <Image style={styles.logo} source={require('@/assets/images/LogoCentralCoffee.png')} />
            <ThemedText style={{ fontFamily: 'RobotoRegular', textAlign: 'center', marginBottom: 25, }}>Conecte-se à sua conta Central Coffee.</ThemedText>
            <ThemedView style={styles.form}>
                {errors.nome && <ThemedText style={styles.labelError}>{errors.nome.message}</ThemedText>}
                <Controller
                    control={control}
                    name="nome"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, { borderColor: errors.nome && '#ff375b' }]}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Seu Nome"
                        />
                    )}
                />
                {errors.CPF && <ThemedText style={styles.labelError}>{errors.CPF.message}</ThemedText>}
                <Controller
                    control={control}
                    name="CPF"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, { borderColor: errors.CPF && '#ff375b' }]}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="CPF"
                        />
                    )}
                />
                {errors.email && <ThemedText style={styles.labelError}>{errors.email.message}</ThemedText>}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, { borderColor: errors.email && '#ff375b' }]}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="E-mail"
                        />
                    )}
                />
                {errors.password && <ThemedText style={styles.labelError}>{errors.password.message}</ThemedText>}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, { borderColor: errors.password && '#ff375b' }]}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Senha"
                            secureTextEntry={true}
                        />
                    )}
                />
                {errors.repassword && <ThemedText style={styles.labelError}>{errors.repassword.message}</ThemedText>}
                <Controller
                    control={control}
                    name="repassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, { borderColor: errors.repassword && '#ff375b' }]}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Digite novamente a Senha"
                            secureTextEntry={true}
                        />
                    )}
                />

                <ThemedText style={[styles.label, { marginBottom: 15, }]}>Para sua segurança, sua senha deve ter no mínimo 8 caracteres e incluir uma combinação de letras, números e símbolos.</ThemedText>
                <ThemedView style={{ backgroundColor: '', flexDirection: 'row', marginBottom: 25 }}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                    />
                    <ThemedText style={[styles.label, { marginLeft: 10, }]}>Seu cadastro implica na aceitação dos Termos de Uso e da Política de Privacidade da Central Coffee.</ThemedText>
                </ThemedView>
                <Button color={'black'} title="Cadastrar" onPress={handleSubmit(handleSignUp)} />
                <ThemedText style={{textAlign: 'center', backgroundColor: '', marginTop: 25, color: 'white'}}>Já se cadastrou? <Link style={{fontWeight: 'bold'}} href={"/(auth)/signIn"}>Entre agora!</Link></ThemedText>
            </ThemedView>
        </ThemedView>
    );
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: ''
    },
    form: {
        flex: 1,
        backgroundColor: '#432614',
        padding: 40,
        alignContent: 'center',
        flexDirection: 'column',
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        padding: 10,
        // height: 36,
        borderRadius: 10,
        marginBottom: 15,
        fontFamily: 'RobotoRegular',
    },
    labelError: {
        color: 'red',
    },
    label: {
        fontFamily: 'RobotoRegular',
        fontSize: 14,
        lineHeight: 16,
        textAlign: 'justify',
        color: 'white'
    },
    logo: {
        width: 250,
        height: 87,
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 5,
    },
});
