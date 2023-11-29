import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditEntry = ({ route, navigation }) => {
  
  const entry = route?.params?.entry;
  
  const [itemName, setItemName] = useState(entry.itemName);
  const [plannedAmount, setPlannedAmount] = useState(entry.plannedAmount.toString());
  const [actualAmount, setActualAmount] = useState(entry.actualAmount.toString());

// Function to handle saving the edited entry
const handleSaveEntry = async () => {
  const updatedEntry = {
    id: entry.id,
    itemName: itemName,
    plannedAmount: parseFloat(plannedAmount),
    actualAmount: parseFloat(actualAmount),
  };

  const existingEntriesString = await AsyncStorage.getItem('budgetEntries');
  const existingEntries = JSON.parse(existingEntriesString);

  const entryIndex = existingEntries.findIndex((e) => e.id === updatedEntry.id);

  existingEntries[entryIndex] = updatedEntry;

  await AsyncStorage.setItem('budgetEntries', JSON.stringify(existingEntries));

  navigation.goBack();
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name:</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
      />

      <Text style={styles.label}>Planned Amount:</Text>
      <TextInput
        style={styles.input}
        value={plannedAmount}
        onChangeText={setPlannedAmount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Actual Amount:</Text>
      <TextInput
        style={styles.input}
        value={actualAmount}
        onChangeText={setActualAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditEntry;
