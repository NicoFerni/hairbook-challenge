import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const FilterChip = ({ filter, isSelected, onPress }: { filter: string, isSelected: boolean, onPress: () => void }) => (
    <TouchableOpacity
      style={[styles.filterChip, isSelected && styles.filterChipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.filterText, isSelected && styles.filterTextSelected]}>
        {filter}
      </Text>
    </TouchableOpacity>
  );


const styles = StyleSheet.create({
  filterChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterChipSelected: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  filterText: {
    fontSize: 14,
    color: '#64748b',
    textTransform: 'capitalize',
  },
  filterTextSelected: {
    color: '#fff',
    fontWeight: '600',
  }})