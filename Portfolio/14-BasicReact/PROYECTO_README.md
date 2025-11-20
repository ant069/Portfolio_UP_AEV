# Star Wars Movies React App

## Descripción

Aplicación React que muestra una colección de películas de Star Wars con las siguientes características:

- **Tarjetas de películas**: Muestra 6 películas con póster, título, año y episodio
- **Hover effect**: Al pasar el mouse sobre una tarjeta, la imagen cambia al logo de la afiliación del personaje principal
  - Azul para afiliaciones buenas (Jedi, Rebellion)
  - Rojo para afiliaciones malvadas (Sith, Empire)
- **Sistema de likes/dislikes**: Cada película tiene botones para dar like o dislike
- **Detalles del personaje**: Botón "More..." que muestra información del personaje principal
- **Sistema de comentarios**: Formulario para agregar comentarios que persisten durante la sesión

## Estructura del Proyecto

```
14-BasicReact/
├── public/
│   ├── data/
│   │   └── data.js          # Datos de las películas
│   └── images/              # Imágenes de películas y personajes
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx    # Componente de tarjeta de película
│   │   ├── MovieCard.css
│   │   ├── MovieDetails.jsx # Componente de detalles
│   │   └── MovieDetails.css
│   ├── App.jsx              # Componente principal
│   ├── App.css
│   ├── main.jsx             # Punto de entrada
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Instalación

1. Asegúrate de tener Node.js instalado (versión 16 o superior)

2. Instala las dependencias:
```bash
npm install
```

## Ejecución

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:5173/

## Construcción para producción

Para crear una versión optimizada:
```bash
npm run build
```

Los archivos generados estarán en el directorio `dist/`

## Características Implementadas

### 1. Tarjetas de Películas
- Muestra póster, título y año de cada película
- Diseño responsive con grid layout
- Animaciones de hover con elevación de la tarjeta

### 2. Sistema de Likes/Dislikes
- Botones con contadores en cada tarjeta
- Estado persistente durante la sesión
- Iconos de emoji para mejor UX

### 3. Cambio de Imagen en Hover
- Al pasar el mouse, se muestra el logo de la afiliación
- Color del borde cambia según la afiliación:
  - **Azul**: Jedi, Rebellion (afiliaciones buenas)
  - **Rojo**: Sith, Empire (afiliaciones malvadas)

### 4. Detalles del Personaje Principal
- Botón "More..." en cada tarjeta
- Sección expandible que muestra:
  - Imagen del personaje
  - Nombre y afiliación
  - Biografía completa

### 5. Sistema de Comentarios
- Formulario con campos de nombre y comentario
- Los comentarios se muestran con fecha y hora
- Persistencia durante la sesión (se pierden al recargar)
- Validación de campos requeridos

## Tecnologías Utilizadas

- **React 18**: Framework principal
- **Vite**: Build tool y dev server
- **CSS3**: Estilos con gradientes y efectos modernos
- **JavaScript ES6+**: Sintaxis moderna

## Estado de la Aplicación

El estado se maneja en el componente principal `App.jsx`:
- `movies`: Array con datos de películas, likes, dislikes y comentarios
- `selectedMovie`: Índice de la película seleccionada para mostrar detalles

Los comentarios y likes/dislikes persisten solo durante la sesión actual.

## Mapeo de Afiliaciones

```javascript
{
  Jedi: { logo: 'jedi.png', color: 'blue' },
  Sith: { logo: 'sith.png', color: 'red' },
  Empire: { logo: 'empire.png', color: 'red' },
  Rebellion: { logo: 'rebel.png', color: 'blue' }
}
```

## Estilos

La aplicación utiliza:
- Tema oscuro con gradientes
- Efectos de glassmorphism
- Animaciones suaves con transitions
- Diseño responsive para móviles y tablets
- Color dorado (#ffd700) para acentos importantes

## Licencia

Este es un proyecto educativo de práctica con React.
