import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BudgetEntry from './src/screens/BudgetEntery';
import AllBudgetEntries from './src/screens/AllBudgetEntries';
import EditEntry from './src/screens/EditEntry';


const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='All Budget Entries'>
        <Stack.Screen
          name='BudgetEntry'
          component={BudgetEntry}
          options={{
            headerTitleAlign: 'center', 
          }}
        />
        <Stack.Screen
          name='All Budget Entries'
          component={AllBudgetEntries}
          options={{
            headerTitleAlign: 'center', 
          }}
        />
        <Stack.Screen
          name='EditEntry'
          component={EditEntry}
          options={{
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
