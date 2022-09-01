import React, { useEffect, useState } from "react";
import Prototype from 'prop-types';
import { StyleSheet, Platform, View, Text, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { firebase_db } from "../firebaseConfig"
import LikeCard from "../Components/LikeCard";
import * as Application from 'expo-application';
const isIOS = Platform.OS === 'ios';

export default function LikePage({ navigation }) {
    const [ tip, setTip ] = useState([ ]);

    let userUniqueId=null;

    const getUserId = async() => {
        if(isIOS){
        let iosId = await Application.getIosIdForVendorAsync();
            userUniqueId = iosId;
        } else{
            userUniqueId = await Application.androidId;
        }

        console.log(userUniqueId);
    }

    const removeItem = ( contentIdx ) => {
        console.log('remove start : ', contentIdx);
        firebase_db.ref('/like/'+userUniqueId+'/'+contentIdx).remove().then(()=> {
            console.log('remove Success!');
            readItems(true);
        })
        .catch(function(error) {
            console.log("Remove failed: " + error.message)
        });
      }

    const readItems = ( reload ) => {
        firebase_db.ref('/like/'+userUniqueId).once('value').then((snapshot) => {
            let temp = snapshot.val();

            if( temp===null&&reload===false ) console.log('찜 0 ');
            else if( temp===null&&reload===true ) setTip('');
            else setTip(temp);
        });
    }

    useEffect(()=> {
        navigation.setOptions({
            title: '꿀팁 찜'
        });

        getUserId();
        readItems(false);
    },[]);

    return (
        <ScrollView style={styles.cardContainer}>
            {
                ( tip.length<1||tip===null )
                ? <Text> 찜 데이터 없음 </Text>
                : tip.map((content, i) => { 
                    return(<LikeCard content={content} key={i} removeItem={removeItem} navigation={navigation} />)
                    })
            } 
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        marginTop:10,
        marginLeft:10
      },
});