import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import styles from '../styles';

const { width } = Dimensions.get('window');
const API_KEY = 'b1b3b2f303756f31d1a4b8ba85e04115';

export default function App() {
  const [city, setCity] = useState('São Paulo');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    if (!city.trim()) return alert('Digite uma cidade válida.');
    setLoading(true);
    try {
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`;

      const [currentRes, forecastRes] = await Promise.all([
        fetch(currentUrl),
        fetch(forecastUrl)
      ]);

      const currentData = await currentRes.json();
      const forecastData = await forecastRes.json();

      if (currentData.cod !== 200) throw new Error('Cidade não encontrada');

      setWeather({
        name: currentData.name,
        temp: currentData.main.temp.toFixed(1),
        max: currentData.main.temp_max.toFixed(1),
        min: currentData.main.temp_min.toFixed(1),
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
      });

      const nextDays = forecastData.list.filter((_, i) => i % 8 === 0).slice(0, 7);
      setForecast(nextDays);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Buscar cidade..."
            placeholderTextColor="#ddd"
            value={city}
            onChangeText={setCity}
            style={styles.searchInput}
            onSubmitEditing={fetchWeather}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={fetchWeather}>
            <Ionicons name="arrow-forward-circle" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Temperatura atual */}
        {weather && (
          <View style={styles.header}>
            <Text style={styles.city}>{weather.name}</Text>
            <Image
              source={{ uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png` }}
              style={styles.mainIcon}
            />
            <Text style={styles.temp}>{weather.temp}°C</Text>
            <Text style={styles.description}>{weather.description}</Text>
            <Text style={styles.range}>Max: {weather.max}° / Min: {weather.min}°</Text>
          </View>
        )}

        {/* Previsão dos próximos dias */}
        <Text style={styles.sectionTitle}>Previsão 7 dias</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastScroll}>
          {forecast.map((day, index) => (
            <View key={index} style={styles.forecastCard}>
              <Text style={styles.forecastDay}>
                {new Date(day.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'short' })}
              </Text>
              <Image
                source={{ uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png` }}
                style={styles.forecastIcon}
              />
              <Text style={styles.forecastTemp}>{day.main.temp.toFixed(0)}°C</Text>
            </View>
          ))}
        </ScrollView>

        {/* Cards extras */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Ionicons name="sunny" size={22} color="#fff" />
            <Text style={styles.infoLabel}>Nascer do sol</Text>
            <Text style={styles.infoValue}>5:28 AM</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="moon" size={22} color="#fff" />
            <Text style={styles.infoLabel}>Pôr do sol</Text>
            <Text style={styles.infoValue}>7:25 PM</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Feather name="activity" size={22} color="#fff" />
            <Text style={styles.infoLabel}>Qualidade do ar</Text>
            <Text style={styles.infoValue}>3 - Moderada</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="sunny-outline" size={22} color="#fff" />
            <Text style={styles.infoLabel}>Índice UV</Text>
            <Text style={styles.infoValue}>4 - Médio</Text>
          </View>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}