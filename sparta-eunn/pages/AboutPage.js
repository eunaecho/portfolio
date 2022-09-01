import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView, Image, Text, View, } from "react-native";


export default function AboutPage({ navigation }) {
    const aboutImage = "https://storage.googleapis.com/sparta-image.appspot.com/lecture/about.png";
    const innerTitle = "많은 내용을 간결하게 담아내려 노력했습니다!";
    const innerSub = "꼭 완주하셔서 꼭 여러분것으로 만들어가시길 바랍니다";

    useEffect(() => {
        navigation.setOptions({
            title: '소개페이지'
        })
    });

    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.titleView} >Hi! 스파르타 코딩 앱개발 반에 오신것을 환영합니다</Text>
            <View style={styles.innerContainer} >
                <Image style={styles.imageView} source={{uri:aboutImage}}></Image>
                <Text style={styles.innerTitle} >{innerTitle}</Text>
                <Text style={styles.innerText} >{innerSub}</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color:'white', fontWeight:'700'}} >
                        나의 인스타 계정
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "navy",
    },
    innerContainer: {
        flex: 6,
        padding:25,
        marginHorizontal:30,
        marginBottom: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    titleView: {
        flex: 1,
        margin: 30,
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    imageView: {
        marginTop: 50,
        marginBottom: 15,
        borderRadius: 40,
        width: 150,
        height: 150,
    },
    innerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign:'center'
    }, 
    innerText: {
        marginBottom: 10,
        textAlign:'center'
    },
    button: {
        padding: 20,
        borderRadius: 15,
        margin: 15,
        backgroundColor: '#ff9909'
    }

});
