import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SalonCardProps } from "../interfaces";


export const SalonCard = ({ salon, onPress }: SalonCardProps) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(salon)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardEmoji}>{salon.image}</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{salon.name}</Text>
          <Text style={styles.cardType}>{salon.type}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.cardLocation}>{salon.location}</Text>
          </View>
        </View>
        <View style={styles.cardRight}>
          <View style={styles.creditsContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.rating}>{salon.rating}</Text>
          </View>
          <Text style={styles.cardCredits}>{salon.creditCost} créditos</Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{salon.description}</Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
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
    cardLocation: {
      fontSize: 12,
      color: '#64748b',
      marginLeft: 4,
    },
    cardRight: {
      alignItems: 'flex-end',
    },
    creditsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    rating: {
      fontSize: 12,
      color: '#64748b',
      marginLeft: 4,
    },
    cardCredits: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#8B5CF6',
    },
    cardDescription: {
      fontSize: 14,
      color: '#64748b',
      lineHeight: 20,
    },
  });