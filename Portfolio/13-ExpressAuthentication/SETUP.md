# Configuración de Autenticación Express - Instrucciones

## ✅ Implementación Completa

Este proyecto ahora incluye todas las funcionalidades requeridas del README:

### Características Implementadas:
1. ✅ **Registro de Usuarios** - Formulario con username, email y password
2. ✅ **Passport-Local-Mongoose** - Autenticación de usuarios y gestión de sesiones
3. ✅ **Sistema de Login** - Los usuarios pueden iniciar sesión con usuario y contraseña
4. ✅ **Método de Logout** - Los usuarios pueden cerrar sesión
5. ✅ **Rutas Protegidas** - No se puede acceder a `/secrets` sin autenticación
6. ✅ **Variables de Entorno** - Secret de sesión almacenado en archivo `.env`
7. ✅ **Google OAuth 2.0** - Inicio de sesión social con Google
8. ✅ **Cookie Parser** - Las cookies de sesión se establecen y validan
9. ✅ **Envío de Secretos** (Extra) - Los usuarios pueden enviar y ver secretos

---

## 🚀 Instrucciones de Configuración

### 1. Instalar Dependencias
Todos los paquetes ya han sido instalados:
- express
- mongoose
- passport
- passport-local
- passport-local-mongoose
- passport-google-oauth20
- express-session
- cookie-parser
- dotenv
- ejs
- mongoose-findorcreate

### 2. Configurar Variables de Entorno

Abre el archivo `.env` y actualiza lo siguiente:

```env
# Cambia esto por una cadena aleatoria y segura
SESSION_SECRET=tu_clave_secreta_super_segura_cambiar_esto

# Obtén estas credenciales de Google Cloud Console
GOOGLE_CLIENT_ID=tu_google_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_google_client_secret_aqui
```

### 3. Configurar Google OAuth 2.0

Para habilitar la autenticación con Google:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Navega a: **APIs y Servicios > Credenciales**
4. Configura la **Pantalla de Consentimiento OAuth**:
   - Tipo de usuario: Externo (o Interno para workspace)
   - Nombre de la aplicación: Tu nombre de app
   - Email de soporte al usuario: Tu email
   - Contacto del desarrollador: Tu email
   - Ámbitos: `email`, `profile`, `openid`

5. Crea **ID de Cliente OAuth 2.0**:
   - Tipo de aplicación: Aplicación web
   - Nombre: LOTR Authentication
   - Orígenes de JavaScript autorizados: `http://localhost:3000`
   - URIs de redireccionamiento autorizados: `http://localhost:3000/auth/google/secrets`

6. Copia el **Client ID** y **Client Secret** a tu archivo `.env`

### 4. Iniciar MongoDB

Asegúrate de que MongoDB esté corriendo en tu sistema:
```bash
# Windows - Si MongoDB está instalado como servicio, ya debería estar corriendo
# O inícialo manualmente con:
mongod
```

### 5. Ejecutar la Aplicación

```bash
npm start
```

O para desarrollo con reinicio automático:
```bash
npm install -g nodemon
nodemon server.js
```

El servidor iniciará en: **http://localhost:3000**

---

## 🧪 Probar la Aplicación

### Probar Autenticación Local:
1. Ve a `http://localhost:3000`
2. Haz clic en **Register** (Registrarse)
3. Crea una cuenta con username, email y password
4. Serás automáticamente autenticado y redirigido a `/secrets`
5. Prueba cerrar sesión y volver a iniciar sesión
6. Intenta acceder a `/secrets` directamente (debería redirigir al login)

### Probar Google OAuth:
1. Haz clic en **Iniciar sesión con Google** en la página de login o registro
2. Autoriza con tu cuenta de Google
3. Serás redirigido a la página de secretos

### Probar Envío de Secretos:
1. Después de iniciar sesión, haz clic en **Submit a Secret**
2. Ingresa tu secreto y envíalo
3. Ve todos los secretos en la página de secretos

### Probar Funcionalidad de Cookies:
1. Abre las Herramientas de Desarrollo de Chrome (F12)
2. Ve a **Application > Cookies > http://localhost:3000**
3. Busca la cookie `connect.sid` - esta es tu sesión
4. Cuando cierres sesión, la sesión se destruye

### Probar Rutas Protegidas:
1. Abre una nueva ventana de incógnito/privada
2. Intenta acceder a `http://localhost:3000/secrets` directamente
3. Deberías ser redirigido a `/login`

---

## 📁 Estructura del Proyecto

```
13-ExpressAuthentication/
├── server.js              # Archivo principal con todas las rutas
├── .env                   # Variables de entorno (CLAVES SECRETAS)
├── .gitignore            # Archivo para ignorar en git
├── package.json          # Dependencias
├── README.md             # Requisitos originales
├── SETUP.md              # Este archivo
├── public/
│   ├── css/
│   │   └── style.css
│   ├── html/
│   │   ├── index.html    # Página de inicio actualizada
│   │   └── secret.html
│   └── images/
└── views/                # Plantillas EJS
    ├── register.ejs      # Formulario de registro
    ├── login.ejs         # Formulario de login
    ├── secrets.ejs       # Página protegida de secretos
    └── submit.ejs        # Formulario de envío de secretos
```

---

## 🔒 Características de Seguridad

1. **Hash de Contraseñas** - Las contraseñas se hashean usando passport-local-mongoose
2. **Gestión de Sesiones** - Sesiones de Express con cookies seguras
3. **Variables de Entorno** - Datos sensibles almacenados en .env
4. **Middleware de Autenticación** - Rutas protegidas con `isAuthenticated()`
5. **OAuth 2.0** - Autenticación segura de terceros con Google

---

## 📝 Rutas

### Rutas Públicas:
- `GET /` - Página de inicio
- `GET /register` - Formulario de registro
- `GET /login` - Formulario de login
- `POST /register` - Procesar registro
- `POST /login` - Procesar login

### Rutas Protegidas (requieren autenticación):
- `GET /secrets` - Ver todos los secretos
- `GET /submit` - Formulario de envío de secretos
- `POST /submit` - Procesar envío de secreto
- `GET /logout` - Cerrar sesión del usuario

### Rutas OAuth:
- `GET /auth/google` - Iniciar OAuth de Google
- `GET /auth/google/secrets` - Callback de OAuth de Google

---

## 🐛 Solución de Problemas

**Problema**: No se puede conectar a MongoDB
- **Solución**: Asegúrate de que MongoDB esté corriendo en `mongodb://127.0.0.1:27017/`

**Problema**: Google OAuth no funciona
- **Solución**: Verifica que la URI de redirección en Google Console coincida exactamente: `http://localhost:3000/auth/google/secrets`

**Problema**: La sesión no persiste
- **Solución**: Verifica que `SESSION_SECRET` esté configurado en el archivo `.env`

**Problema**: Error "El usuario ya existe"
- **Solución**: Usa un nombre de usuario diferente o limpia la base de datos

---

## 🎉 ¡Todos los Requisitos Completados!

✅ Formulario de registro con username, email, password
✅ Passport-local-mongoose para autenticación
✅ Gestión de sesiones con acceso automático a secretos
✅ Formulario de login para usuarios existentes
✅ Funcionalidad de logout
✅ Rutas protegidas (no se puede acceder directamente)
✅ Variables de entorno para secretos
✅ Implementación de Google OAuth 2.0
✅ Cookie parser con cookies de sesión
✅ Característica extra: Envío y visualización de secretos

¡La aplicación está lista para usar!
