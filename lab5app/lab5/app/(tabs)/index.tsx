import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState('');
  const [operation, setOperation] = useState('');
  const PINDOKARTY = '1234-5678-9101-1121';
  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperation = (op: string) => {
    setFirstNumber(display);
    setOperation(op);
    setDisplay('0');
  };

  const calculate = () => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
    }

    setDisplay(result.toString());
    setFirstNumber('');
    setOperation('');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.display}>{display}</ThemedText>
      <View style={styles.buttonGrid}>
        {[['7','8','9','/'], ['4','5','6','*'], ['1','2','3','-'], ['0','.','=','+']].map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((btn) => (
              <ThemedView key={btn} style={styles.button}>
                <ThemedText 
                  style={styles.buttonText}
                  onPress={() => {
                    if (btn === '=') calculate();
                    else if (['+','-','*','/'].includes(btn)) handleOperation(btn);
                    else handleNumber(btn);
                  }}>
                  {btn}
                </ThemedText>
              </ThemedView>
            ))}
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  display: {
    fontSize: 40,
    textAlign: 'right',
    padding: 20,
  },
  buttonGrid: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
  },
});