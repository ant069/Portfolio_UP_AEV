# React with API (local & 3rd party)

Este proyecto es una aplicación web completa que muestra una colección de películas con funcionalidad de likes/dislikes y comentarios persistentes usando MongoDB.

## 🎯 Características Implementadas

✅ **Backend con Express y MongoDB**
- API REST para gestionar películas, likes/dislikes y comentarios
- Base de datos MongoDB para persistencia de datos
- Endpoints para CRUD de comentarios y likes

✅ **Frontend con React y Vite**
- Diseño responsivo con React Bootstrap
- Navegación con React Router
- Componentes reutilizables (MovieList, MovieCard, MovieDetail)

✅ **Funcionalidades**
- 👍👎 Sistema de likes/dislikes persistente en cada tarjeta
- 💬 Comentarios guardados en MongoDB entre sesiones
- 🔄 Navegación a página de detalle al hacer clic en una película
- 📱 Diseño totalmente responsivo

## 🚀 Instalación

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB (local o Atlas)

### Paso 1: Instalar dependencias del servidor
```bash
npm install
```

### Paso 2: Instalar dependencias del cliente
```bash
cd client
npm install
cd ..
```

### Paso 3: Configurar MongoDB
1. Asegúrate de tener MongoDB corriendo localmente en el puerto 27017
2. O modifica el archivo `.env` con tu URI de MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/moviesdb
```

## 🎬 Uso

### Iniciar la aplicación completa (Frontend + Backend)
```bash
npm run dev
```

Esto iniciará:
- Backend en http://localhost:5000
- Frontend en http://localhost:3000

### Iniciar solo el backend
```bash
npm run server
```

### Iniciar solo el frontend
```bash
npm run client
```

## 📁 Estructura del Proyecto

```
15-React3rd-partyAPI/
├── server/
│   └── index.js              # Servidor Express con API y MongoDB
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MovieList.jsx    # Lista de películas
│   │   │   ├── MovieCard.jsx    # Tarjeta individual de película
│   │   │   └── MovieDetail.jsx  # Detalle de película con comentarios
│   │   ├── App.jsx              # Componente principal con rutas
│   │   ├── main.jsx             # Punto de entrada
│   │   └── App.css              # Estilos
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json
└── .env
```

## 🛠️ Tecnologías Utilizadas

### Backend
- Express.js
- MongoDB con Mongoose
- CORS
- dotenv

### Frontend
- React 18
- React Router v6
- React Bootstrap
- Bootstrap 5
- Axios
- Vite

## 📝 API Endpoints

### Películas
- `GET /api/movies` - Obtener todas las películas
- `GET /api/movies/:id` - Obtener una película específica

### Likes/Dislikes
- `GET /api/likes/:movieId` - Obtener likes/dislikes de una película
- `POST /api/likes/:movieId/like` - Incrementar like
- `POST /api/likes/:movieId/dislike` - Incrementar dislike

### Comentarios
- `GET /api/comments/:movieId` - Obtener comentarios de una película
- `POST /api/comments` - Agregar un comentario
- `DELETE /api/comments/:id` - Eliminar un comentario

## 🎨 Características de Diseño

- Grid responsivo que se adapta a diferentes tamaños de pantalla (1, 2 o 3 columnas)
- Efecto hover en las tarjetas de películas
- Badges para mostrar año y rating
- Botones de like/dislike con emojis
- Sección de comentarios con formulario integrado
- Navegación intuitiva con botón de regreso

## 📱 Responsive Design

La aplicación es completamente responsiva gracias a React Bootstrap:
- Móvil: 1 columna
- Tablet: 2 columnas
- Desktop: 3 columnas

## 🔧 Troubleshooting

### MongoDB no se conecta
- Verifica que MongoDB esté corriendo: `mongod --version`
- Revisa la URI en el archivo `.env`

### Puerto en uso
- Cambia los puertos en `.env` (backend) y `vite.config.js` (frontend)

### Dependencias faltantes
- Ejecuta `npm install` en la raíz y en `client/`

## 👨‍💻 Autor

Proyecto desarrollado como parte del portfolio UP AEV

## 📄 Licencia

ISC
