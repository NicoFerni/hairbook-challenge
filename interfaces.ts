export const serviceTypes = [
    "todos",
    "corte de cabello",
    "barba",
    "peinados",
    "coloración",
    "tratamientos"
  ] as const;

export type ServiceType = typeof serviceTypes[number];

export interface Salon {
    id: number;
    name: string;
    type: string;
    location: string;
    description: string;
    creditCost: number;
    rating: number;
    image: string;
}

export interface SalonCardProps {
  salon: Salon;
  onPress: (salon: Salon) => void;
}
