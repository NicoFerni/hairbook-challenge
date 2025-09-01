import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { initialData } from '../api';
import { SalonCard } from '../components/card';
import { FilterChip } from '../components/filter';
import { Salon, serviceTypes } from '../interfaces';


export default function App() {
  const [user, setUser] = useState(initialData.user);
  const [salons, ] = useState(initialData.salons);
  const [filteredSalons, setFilteredSalons] = useState(initialData.salons);
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [searchText, setSearchText] = useState("");
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  useEffect(() => {
    let filtered = salons;
    if (selectedFilter !== "todos") {
      filtered = filtered.filter(salon => salon.type === selectedFilter);
    }
    if (searchText) {
      filtered = filtered.filter(salon =>
        salon.name.toLowerCase().includes(searchText.toLowerCase()) ||
        salon.location.toLowerCase().includes(searchText.toLowerCase()) ||
        salon.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredSalons(filtered);
  }, [selectedFilter, searchText, salons]);

  const handleReservation = (salon: Salon) => {
    if (user.credits >= salon.creditCost) {
      setUser(prev => ({ ...prev, credits: prev.credits - salon.creditCost }));
      setModalVisible(false);
      setConfirmationVisible(true);
    } else {
      Alert.alert(
        "Créditos Insuficientes",
        `No tienes suficientes créditos para esta reserva. Necesitas ${salon.creditCost} créditos pero solo tienes ${user.credits}.`,
        [{ text: "OK" }]
      );
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.greeting}>Hola, {user.name}! 👋</Text>
          <View style={styles.creditsDisplay}>
            <Ionicons name="diamond-outline" size={20} color="#8B5CF6" />
            <Text style={styles.creditsText}>{user.credits} créditos</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Encuentra tu salón perfecto</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar salones o ubicaciones..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filtros */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {serviceTypes.map((filter: string) => (
          <FilterChip
            key={filter}
            filter={filter}
            isSelected={selectedFilter === filter}
            onPress={() => setSelectedFilter(filter)}
          />
        ))}
      </ScrollView>

      {/* Lista de salones */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredSalons.length > 0 ? (
          filteredSalons.map((salon) => (
            <SalonCard 
              key={salon.id} 
              salon={salon} 
              onPress={(salon) => {
                setSelectedSalon(salon);
                setModalVisible(true);
              }}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No se encontraron salones</Text>
            <Text style={styles.emptySubtext}>Prueba con otros filtros o búsqueda</Text>
          </View>
        )}
      </ScrollView>

      {/* Modal de detalles */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedSalon && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalEmoji}>{selectedSalon.image}</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalTitle}>{selectedSalon.name}</Text>
                <Text style={styles.modalType}>{selectedSalon.type}</Text>

                <View style={styles.modalInfo}>
                  <View style={styles.modalRow}>
                    <Ionicons name="location-outline" size={20} color="#8B5CF6" />
                    <Text style={styles.modalLocation}>{selectedSalon.location}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Ionicons name="star" size={20} color="#FFD700" />
                    <Text style={styles.modalRating}>Calificación: {selectedSalon.rating}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Ionicons name="diamond-outline" size={20} color="#8B5CF6" />
                    <Text style={styles.modalCost}>Costo: {selectedSalon.creditCost} créditos</Text>
                  </View>
                </View>

                <Text style={styles.modalDescription}>{selectedSalon.description}</Text>

                <TouchableOpacity
                  style={[
                    styles.reserveButton,
                    user.credits < selectedSalon.creditCost && styles.reserveButtonDisabled
                  ]}
                  onPress={() => handleReservation(selectedSalon)}
                  disabled={user.credits < selectedSalon.creditCost}
                >
                  <Text style={styles.reserveButtonText}>
                    {user.credits >= selectedSalon.creditCost ? 'Reservar Cita' : 'Créditos Insuficientes'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmationVisible}
        onRequestClose={() => setConfirmationVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationContent}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={60} color="#10B981" />
            </View>
            <Text style={styles.successTitle}>¡Reserva Exitosa!</Text>
            <Text style={styles.successText}>
              Tu cita en {selectedSalon?.name} ha sido confirmada.
            </Text>
            <Text style={styles.creditsRemaining}>
              Te quedan {user.credits} créditos
            </Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setConfirmationVisible(false)}
            >
              <Text style={styles.okButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  creditsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  creditsText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  filtersContainer: {
    maxHeight: 50,
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cardEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  cardType: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalEmoji: {
    fontSize: 48,
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  modalType: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  modalInfo: {
    marginBottom: 20,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalLocation: {
    fontSize: 16,
    color: '#64748b',
    marginLeft: 8,
  },
  modalRating: {
    fontSize: 16,
    color: '#64748b',
    marginLeft: 8,
  },
  modalCost: {
    fontSize: 16,
    color: '#64748b',
    marginLeft: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginBottom: 30,
  },
  reserveButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  reserveButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmationContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  successText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
  },
  creditsRemaining: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 24,
  },
  okButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});