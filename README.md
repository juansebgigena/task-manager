# 📝 Task Manager

**Task Manager** es una aplicación full-stack para la gestión de tareas personales.
Permite a los usuarios registrarse, autenticarse de forma segura y administrar sus tareas diarias mediante una interfaz moderna, intuitiva y con persistencia de datos.

---

## 🚀 Tecnologías Utilizadas

### 🎨 Frontend
- **React.js (Vite)**
- **Context API**
- **React Router DOM**
- **CSS Modules (Custom)**
- **Axios**

### ⚙️ Backend
- **Node.js & Express**
- **Sequelize ORM**
- **JWT (JSON Web Tokens)**
- **Cookie-parser**

### 🗄️ Infraestructura
- **Docker**
- **MySQL 8.0**

---

## ✨ Funcionalidades Principales

- Registro y login de usuarios
- Autenticación segura con JWT
- Rutas protegidas según sesión activa
- CRUD completo de tareas
- Persistencia de datos en MySQL
- Interfaz responsive y moderna
- Manejo centralizado de estado global

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegurate de tener instalado:

1. [Node.js](https://nodejs.org/) v18 o superior  
2. [Docker Desktop](https://www.docker.com/products/docker-desktop/)  
3. [Git](https://git-scm.com/)  

---

## 🏁 Instalación y Puesta en Marcha

1️⃣ Clonar el repositorio
```bash
git clone https://github.com/juansebgigena/task-manager.git
```

2️⃣ Configurar variables de entorno:
Crear un archivo .env en el backend con las siguientes variables
```bash
NODE_ENV=dev
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=supersecret
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tasks_db
DB_USER=root
DB_PASSWORD=root
DB_DIALECT=mysql
```

Crear un archivo .env en el frontend con las siguientes variables:
```bash
VITE_API_URL=http://localhost:3000/api
```

3️⃣ Levantar la base de datos con Docker
```bash
docker-compose up -d
```

4️⃣ Levantar Backend, crear y popular tablas:
El proyecto utiliza **Sequelize CLI** para gestionar la estructura de la base de datos. Una vez que el contenedor de Docker esté corriendo y el backend configurado, ejecuta los siguientes comandos desde la carpeta `/backend`

```bash
cd backend
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev
```
5️⃣ Levantar Frontend
```bash
cd frontend
npm install
npm run dev
```