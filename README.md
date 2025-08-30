# HairBook Credits - App de Reservas de Salones

Una aplicación móvil para reservar citas en salones de belleza y barberías utilizando un sistema de créditos.

## 📱 Descripción

HairBook Credits es una aplicación que permite a los usuarios explorar diferentes salones de belleza, ver servicios disponibles, y hacer reservas utilizando créditos. La app incluye funcionalidades de búsqueda, filtrado por categorías, y un sistema de reservas interactivo.

## ✨ Funcionalidades Implementadas

### Funcionalidades Obligatorias ✅
- ✅ Vista principal con todos los salones disponibles
- ✅ Información completa de cada salón (nombre, descripción, tipo, ubicación, costo)
- ✅ Filtrado por categorías de servicio
- ✅ Vista detallada de cada salón
- ✅ Sistema de reservas con simulación de botón
- ✅ Saldo de créditos fijo inicial (20 créditos)
- ✅ Validación y mensaje de error por créditos insuficientes

### Funcionalidades Opcionales (Bonus) ✅
- ✅ Diseño responsive para móvil
- ✅ Confirmación visual de reserva exitosa
- ✅ Filtro de búsqueda por nombre, ubicación y descripción
- ✅ Animaciones y transiciones suaves
- ✅ Sistema de calificaciones con estrellas
- ✅ Interfaz moderna con iconos

## 🛠 Tecnologías Utilizadas

- **React Native** - Framework para desarrollo móvil
- **Expo** - Plataforma de desarrollo y despliegue
- **@expo/vector-icons** - Iconos vectoriales
- **TypeScript** - Lenguaje de programación
- **React Hooks** - useState, useEffect para manejo de estado
- **Modal & ScrollView** - Componentes nativos de React Native

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI instalado globalmente

### Pasos para ejecutar el proyecto

1. **Instalar Expo CLI** (si no lo tienes):
   ```bash
   npm install -g expo-cli
   ```

2. **Crear el proyecto**:
   ```bash
   npx create-expo-app HairBookCredits
   cd HairBookCredits
   ```

3. **Instalar dependencias**:
   ```bash
   npm install @expo/vector-icons
   ```

4. **Reemplazar el contenido** de `App.js` con el código proporcionado

5. **Ejecutar la aplicación**:
   ```bash
   npm start
   # o
   expo start
   ```

6. **Ver la app**:
   - Escanea el código QR con la app Expo Go en tu móvil
   - O presiona 'i' para iOS simulator
   - O presiona 'a' para Android emulator
   - O presiona 'w' para web browser

## 📁 Estructura del Proyecto

```
HairBookCredits/
├── App.js              # Componente principal con toda la lógica
├── package.json        # Dependencias y scripts
├── app.json           # Configuración de Expo
├── api.ts             # Data mockeada
├── interfaces.ts      # Tipos y objetos tipados
└── README.md          # Esta documentación
```

## 🎨 Decisiones de Diseño

### Arquitectura
- **Componente único**: Por simplicidad, toda la lógica está en App.js. En un proyecto más grande se separarían en componentes independientes.
- **Estado local**: Uso de useState para manejar créditos, filtros y datos localmente.
- **Datos estáticos**: Los datos están definidos como constantes en el código, simulando una API.

### UI/UX
- **Diseño moderno**: Colores suaves, sombras, y bordes redondeados
- **Navegación intuitiva**: Modales para detalles y confirmaciones
- **Feedback visual**: Animaciones, cambios de estado, y confirmaciones claras
- **Accesibilidad**: Botones grandes, contraste adecuado, textos legibles

### Funcionalidades Técnicas
- **Filtrado múltiple**: Combinación de filtros por categoría y texto de búsqueda
- **Validaciones**: Control de créditos insuficientes con alertas
- **Estado reactivo**: La UI se actualiza automáticamente cuando cambia el estado
- **Componentes reutilizables**: SalonCard y FilterChip como componentes internos

## 💡 Funcionalidades Destacadas

1. **Sistema de Búsqueda Avanzado**: Busca por nombre, ubicación o descripción
2. **Filtros Dinámicos**: Chips de filtro con estado visual activo/inactivo
3. **Modal de Detalles**: Vista completa con toda la información del salón
4. **Confirmación Animada**: Modal de éxito con iconos y animaciones
5. **Gestión de Estado**: Control preciso de créditos y validaciones

## 📱 Capturas de Funcionalidad

- **Pantalla Principal**: Lista de salones con búsqueda y filtros
- **Vista Detalle**: Modal con información completa del salón
- **Confirmación**: Modal de éxito después de reservar
- **Estados de Error**: Alertas cuando no hay créditos suficientes

## 🚧 Posibles Mejoras Futuras

- Separar componentes en archivos independientes
- Implementar navegación con React Navigation
- Agregar persistencia de datos con AsyncStorage
- Integrar con APIs reales
- Añadir autenticación de usuarios
- Implementar sistema de notificaciones
- Agregar mapas para ubicaciones
- Sistema de favoritos
- Historial de reservas

## 📝 Notas Técnicas

- El proyecto está optimizado para mobile-first
- Utiliza SafeAreaView para compatibilidad con diferentes dispositivos
- Los estilos siguen una convención consistente con colores y espaciado
- El código está comentado para facilitar el mantenimiento
- Se implementaron validaciones para prevenir errores de usuario

---

Desarrollado para el desafío HairBook Credits # hairbook-challenge
