import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const calculateBMI = () => {
    if (weight && height) {
      const weightValue = parseFloat(weight);
      const heightValue = parseFloat(height) / 100; // convert cm to meters
      
      if (weightValue > 0 && heightValue > 0) {
        const bmiValue = (weightValue / (heightValue * heightValue)).toFixed(1);
        setBMI(bmiValue);
        
        // Determine BMI category
        if (bmiValue < 18.5) {
          setBMICategory('Underweight');
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
          setBMICategory('Normal');
        } else if (bmiValue >= 25 && bmiValue < 30) {
          setBMICategory('Overweight');
        } else {
          setBMICategory('Obese');
        }
        
        // Animate the result
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        showAlert('Invalid Input', 'Please enter valid weight and height values');
      }
    } else {
      showAlert('Missing Input', 'Please enter both weight and height');
    }
  };
  
  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setBMI(null);
    setBMICategory('');
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };
  
  const showInfo = () => {
    Alert.alert(
      'BMI Categories',
      'Underweight: < 18.5\nNormal: 18.5 - 24.9\nOverweight: 25 - 29.9\nObese: ≥ 30',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>BMI Calculator</Text>
            <TouchableOpacity onPress={showInfo} style={styles.infoButton}>
              <Text style={styles.infoButtonText}>i</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="Enter weight in kg"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="Enter height in cm"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
                <Text style={styles.buttonText}>Calculate</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resetButton} onPress={resetCalculator}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {bmi && (
            <Animated.View style={[styles.resultContainer, { opacity: fadeAnim }]}>
              <Text style={styles.bmiText}>Your BMI</Text>
              <Text style={styles.bmiValue}>{bmi}</Text>
              <Text style={[
                styles.bmiCategory,
                bmiCategory === 'Underweight' && styles.underweight,
                bmiCategory === 'Normal' && styles.normal,
                bmiCategory === 'Overweight' && styles.overweight,
                bmiCategory === 'Obese' && styles.obese,
              ]}>
                {bmiCategory}
              </Text>
            </Animated.View>
          )}
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Developed by Rasik Bhattarai</Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calculateButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bmiText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  bmiValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  bmiCategory: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  underweight: {
    color: '#3498db', // blue
  },
  normal: {
    color: '#2ecc71', // green
  },
  overweight: {
    color: '#f39c12', // orange
  },
  obese: {
    color: '#e74c3c', // red
  },
  footer: {
    marginTop: 'auto',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    color: '#555',
    fontSize: 14,
  },
});

export default BMICalculator;