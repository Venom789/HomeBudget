import React, { useState } from 'react';
import { View, Alert, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const BudgetEntry = ({ navigation }) => {
    const [itemName, setItemName] = useState('');
    const [plannedAmount, setPlannedAmount] = useState('');
    const [actualAmount, setActualAmount] = useState('');


    const saveItem = async () => {
        if (!itemName || !plannedAmount || !actualAmount) {
            Alert.alert('Empty Fields', 'Please fill in all fields before saving.');
            return;
        }

        const entryId = uuid.v4();
        const newEntry = {
            id: entryId || uuid.v4(),
            itemName,
            plannedAmount,
            actualAmount,
        };

        console.log('Data to be saved:', newEntry);
        try {
            // Retrieve existing entries from AsyncStorage
            const existingEntriesString = await AsyncStorage.getItem('budgetEntries');
            const existingEntries = JSON.parse(existingEntriesString) || [];


            existingEntries.push(newEntry);


            await AsyncStorage.setItem(
                'budgetEntries',
                JSON.stringify(existingEntries)
            );
            console.log('all entries : ', existingEntries);

            // Clear the input fields
            setItemName('');
            setPlannedAmount('');
            setActualAmount('');

            
            navigation.navigate('All Budget Entries');
        } catch (error) {
            console.error('Error saving entry:', error);
        }
    };


    const showItems = () => {
        navigation.navigate('All Budget Entries');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name of the item"
                value={itemName}
                onChangeText={setItemName}
            />
            <TextInput
                style={styles.input}
                placeholder="Planned amount"
                value={plannedAmount}
                onChangeText={setPlannedAmount}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Actual amount"
                value={actualAmount}
                onChangeText={setActualAmount}
                keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Save"
                    onPress={saveItem}
                    style={styles.button}
                />
                <Button
                    title="Show Items"
                    onPress={showItems}
                    style={styles.button}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 8,
        width: 120,
    },

});

export default BudgetEntry;
