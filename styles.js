import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 25,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  city: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 5,
  },
  mainIcon: {
    width: width * 0.35,
    height: width * 0.35,
  },
  temp: {
    fontSize: 64,
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
    color: '#e0e0e0',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  range: {
    fontSize: 16,
    color: '#ddd',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    fontWeight: '500',
  },
  forecastScroll: {
    marginBottom: 30,
  },
  forecastCard: {
    width: 80,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 10,
    paddingVertical: 10,
  },
  forecastDay: {
    color: '#fff',
    textTransform: 'capitalize',
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
  forecastTemp: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  infoLabel: {
    color: '#ddd',
    marginTop: 8,
    fontSize: 14,
  },
  infoValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
