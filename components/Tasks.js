import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Octicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const Tasks = ({ text, index, remove, complete, completed}) => {
  return (
    <View style={styles.item}>
        {completed ? (
            <>
                <View style={styles.itemLeft}>
                    <Octicons style={styles.checkedIcon} name="tasklist" size={20} color="green" />
                    <Text style={styles.completedItemText}>{text}</Text>
                </View>
            </>
        ) : (
            <>
                <TouchableOpacity onPress={() => complete(index, text)}>
                    <View style={styles.itemLeft}>
                        <View style={styles.square}></View>
                        <Text style={styles.itemText}>{text}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => remove(index)}>
                    <Foundation name="trash" size={20} color="#d4d8dd" />
                </TouchableOpacity>
            </>
        )}
        
    </View>
  )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55bcf6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
        fontSize: 18,
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55bcf6',
        borderWidth: 2, 
        borderRadius: 5,
    },
    checkedIcon: {
        marginRight: 15,
    },
    completedItemText: {
        maxWidth: '80%',
        textDecorationLine: 'line-through',
        color: '#c0c0c0',
        fontSize: 18,
    },
})

export default Tasks