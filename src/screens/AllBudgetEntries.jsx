import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Alert,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AllBudgetEntries = ({ navigation }) => {
    const [budgetEntries, setBudgetEntries] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchBudgetEntries = async () => {
            try {
                const entriesString = await AsyncStorage.getItem('budgetEntries');
                if (entriesString !== null) {
                    const entries = JSON.parse(entriesString);
                    setBudgetEntries(entries);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBudgetEntries();
        calculateTotals();
    }, [isFocused]);

    // Calculate the total planned amount
    const calculateTotalPlannedAmount = () => {
        return budgetEntries.reduce(
            (total, entry) => total + parseFloat(entry.plannedAmount),
            0,
        );
    };

    // Calculate the total actual amount
    const calculateTotalActualAmount = () => {
        return budgetEntries.reduce(
            (total, entry) => total + parseFloat(entry.actualAmount),
            0,
        );
    };

    const calculateTotals = () => {
        const plannedTotal = budgetEntries.reduce(
            (total, entry) => total + parseFloat(entry.plannedAmount),
            0,
        );
        const actualTotal = budgetEntries.reduce(
            (total, entry) => total + parseFloat(entry.actualAmount),
            0,
        );
        return { plannedTotal, actualTotal };
    };

    function handleAddNewEntry() {
        navigation.navigate('BudgetEntry');
    }

    function handleEditEntry(entry) {
        console.log('entry : ', entry);
        navigation.navigate('EditEntry', { entry });
    }

    function handleDeleteEntry(entryId) {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this entry?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        // Filter out the deleted entry
                        const updatedEntries = budgetEntries.filter(
                            entry => entry.id !== entryId,
                        );

                        setBudgetEntries(updatedEntries);

                        AsyncStorage.setItem(
                            'budgetEntries',
                            JSON.stringify(updatedEntries),
                        )
                            .then(() => {
                                console.log('Entry deleted successfully');
                            })
                            .catch(error => {
                                console.error('Error deleting entry:', error);
                            });
                    },
                },
            ],
        );
    }

    return (
        <View style={styles.container}>
            {/* Total Amounts Container */}
            <View style={styles.amountsContainer}>
                <View style={styles.amountItem}>
                    <Text style={styles.amountLabel}>Total Planned Amount:</Text>
                    <Text style={styles.amountValue}>
                        ${calculateTotalPlannedAmount().toFixed(2)}
                    </Text>
                </View>
                <View style={styles.amountItem}>
                    <Text style={styles.amountLabel}>Total Actual Amount:</Text>
                    <Text style={styles.amountValue}>
                        ${calculateTotalActualAmount().toFixed(2)}
                    </Text>
                </View>
            </View>

            {/* Entries Header */}
            <View style={styles.entriesHeader}>
                <Text style={styles.headerText}>Entries</Text>
                <View>
                    <Text style={styles.headerText}>Amount</Text>
                    <Text style={styles.headerText}>Planned</Text>
                </View>
                <View>
                    <Text style={styles.headerText}>Actual</Text>
                    <Text style={styles.headerText}>Amount</Text>
                </View>
                <Text style={styles.headerText}>Action</Text>
            </View>

            {/* Entries */}

            <FlatList
                data={budgetEntries}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.entryContainer}>
                        <View style={styles.entryTextContainer}>
                            <Text style={styles.itemName}>{item.itemName}</Text>
                            <Text style={styles.amount}>${item.plannedAmount}</Text>
                            <Text style={styles.amount}>${item.actualAmount}</Text>

                            <View style={styles.editDeleteButtons}>
                                <View style={styles.editDeleteButton}>
                                    <TouchableOpacity onPress={() => handleEditEntry(item)}>
                                        <AntDesign name="edit" size={24} color="blue" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.editDeleteButton}>
                                    <TouchableOpacity onPress={() => handleDeleteEntry(item.id)}>
                                        <AntDesign name="delete" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddNewEntry()}>
                <AntDesign name="pluscircle" size={40} color="#0ff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    amountsContainer: {
        backgroundColor: 'lightgray',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
    },
    amountItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    amountLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    amountValue: {
        fontSize: 16,
    },
    entriesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    addButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 50,
    },
    entryContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 8,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        marginBottom: 8,
    },
    entryTextContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 8,
        alignItems: 'center',
    },
    amount: {
        fontSize: 16,
        marginRight: 8,
    },
    editDeleteButtons: {
        display: 'flex',
        flexDirection: 'column',
    },
    editDeleteButton: {
        marginBottom: 15,
    },
});

export default AllBudgetEntries;
