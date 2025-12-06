# 📚 Configuración del Proyecto LMS Frontend

## 📋 Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Instalación](#instalación)
5. [Configuración](#configuración)
6. [Ejecución del Proyecto](#ejecución-del-proyecto)
7. [Arquitectura y Tecnologías](#arquitectura-y-tecnologías)
8. [Autenticación](#autenticación)
9. [Solución de Problemas](#solución-de-problemas)

---

## 📖 Descripción del Proyecto

**LMS Frontend** es una aplicación web desarrollada con **Next.js 16** y **React 19** que implementa un sistema de gestión de aprendizaje (Learning Management System). El proyecto incluye:

- Sistema de autenticación con roles (Usuario y Administrador)
- Dashboard para usuarios y administradores
- Gestión de cursos
- Gestión de usuarios (solo administradores)
- Tema claro/oscuro
- Interfaz responsive y moderna

---

## 🔧 Requisitos del Sistema

### Requisitos Mínimos

Para ejecutar este proyecto, necesitas tener instalado:

1. **Node.js** (versión 18.0.0 o superior)

   - Verifica tu versión: `node --version`
   - Descarga desde: [nodejs.org](https://nodejs.org/)

2. **Gestor de Paquetes** (uno de los siguientes):

   - **pnpm** (recomendado - ya está configurado en el proyecto)
     - Instalación: `npm install -g pnpm`
   - **npm** (incluido con Node.js)
   - **yarn** (alternativa)
     - Instalación: `npm install -g yarn`

3. **Editor de Código** (opcional pero recomendado):
   - Visual Studio Code
   - Cursor
   - WebStorm

### Verificación de Requisitos

Ejecuta estos comandos en tu terminal para verificar que todo está instalado:

```bash
# Verificar Node.js
node --version
# Debe mostrar: v18.x.x o superior

# Verificar npm (incluido con Node.js)
npm --version

# Verificar pnpm (si lo instalaste)
pnpm --version
```

---

## 📁 Estructura del Proyecto

```
lms-front/
│
├── 📂 public/                    # Archivos estáticos (imágenes, iconos, etc.)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   └── vercel.svg
│
├── 📂 src/                        # Código fuente principal
│   │
│   ├── 📂 app/                    # App Router de Next.js (rutas y layouts)
│   │   ├── 📂 (home)/             # Grupo de rutas (home)
│   │   │   └── home/
│   │   │       └── page.tsx       # Página principal pública
│   │   │
│   │   ├── 📂 admin/              # Rutas de administrador
│   │   │   ├── layout.tsx         # Layout específico para admin
│   │   │   ├── admin-dashboard/   # Dashboard del administrador
│   │   │   ├── admin-courses/     # Gestión de cursos
│   │   │   │   ├── page.tsx       # Lista de cursos
│   │   │   │   ├── [courseId]/    # Detalles de curso (dinámico)
│   │   │   │   ├── new-course/    # Crear nuevo curso
│   │   │   │   └── edit-course/   # Editar curso
│   │   │   └── admin-users/       # Gestión de usuarios
│   │   │       ├── page.tsx       # Lista de usuarios
│   │   │       ├── [userId]/      # Detalles de usuario
│   │   │       ├── new-user/      # Crear nuevo usuario
│   │   │       └── edit-user/     # Editar usuario
│   │   │
│   │   ├── 📂 auth/               # Rutas de autenticación
│   │   │   ├── layout.tsx         # Layout para páginas de auth
│   │   │   ├── login/             # Página de inicio de sesión
│   │   │   └── register/          # Página de registro
│   │   │
│   │   ├── 📂 user/               # Rutas de usuario
│   │   │   ├── layout.tsx         # Layout específico para usuarios
│   │   │   ├── user-dashboard/    # Dashboard del usuario
│   │   │   ├── user-courses/      # Catálogo de cursos
│   │   │   └── user-my-courses/   # Mis cursos inscritos
│   │   │
│   │   ├── layout.tsx             # Layout raíz (aplica a toda la app)
│   │   ├── page.tsx               # Página de inicio (redirige a /home)
│   │   ├── globals.css            # Estilos globales
│   │   ├── error.tsx              # Página de error global
│   │   ├── loading.tsx            # Componente de carga global
│   │   └── not-found.tsx          # Página 404
│   │
│   ├── 📂 components/             # Componentes reutilizables
│   │   ├── AdminSidebar.tsx       # Barra lateral del admin
│   │   ├── ProtectedRoute.tsx     # Componente para proteger rutas
│   │   ├── Providers.tsx          # Proveedores de contexto
│   │   └── ThemeToggle.tsx       # Toggle de tema claro/oscuro
│   │
│   ├── 📂 contexts/               # Contextos de React (estado global)
│   │   ├── AuthContext.tsx        # Contexto de autenticación
│   │   └── ThemeContext.tsx       # Contexto de tema
│   │
│   ├── 📂 features/               # Características organizadas por dominio
│   │   ├── 📂 admin/              # Páginas y lógica de administrador
│   │   │   ├── AdminDashboardPage.tsx
│   │   │   ├── AdminCoursesPage.tsx
│   │   │   ├── CourseDetailsPage.tsx
│   │   │   ├── NewCoursePage.tsx
│   │   │   ├── EditCoursePage.tsx
│   │   │   ├── AdminUsersPage.tsx
│   │   │   ├── AdminUserDetailsPage.tsx
│   │   │   ├── NewUserPage.tsx
│   │   │   └── EditUserPage.tsx
│   │   │
│   │   ├── 📂 auth/               # Páginas de autenticación
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   │
│   │   ├── 📂 home/               # Página de inicio pública
│   │   │   └── HomePage.tsx
│   │   │
│   │   └── 📂 user/               # Páginas y lógica de usuario
│   │       ├── UserDashboard/
│   │       ├── UserCourses/
│   │       └── UserMyCourses/
│   │
│   └── 📂 lib/                    # Utilidades y helpers
│       └── mockAuth.ts            # Autenticación mock (temporal)
│
├── 📄 package.json                # Dependencias y scripts del proyecto
├── 📄 pnpm-lock.yaml              # Lock file de pnpm (versiones exactas)
├── 📄 tsconfig.json               # Configuración de TypeScript
├── 📄 next.config.ts              # Configuración de Next.js
├── 📄 eslint.config.mjs           # Configuración de ESLint
├── 📄 postcss.config.mjs          # Configuración de PostCSS
└── 📄 README.md                   # Documentación básica

```

### Explicación de la Estructura

#### 🗂️ App Router (`src/app/`)

Next.js 16 utiliza el **App Router** basado en el sistema de archivos. Cada carpeta representa una ruta:

- **`(home)`**: Los paréntesis crean un "route group" que no afecta la URL
- **`[courseId]`**: Los corchetes indican rutas dinámicas (parámetros)
- **`layout.tsx`**: Define el layout compartido para todas las rutas dentro de esa carpeta
- **`page.tsx`**: Define la página que se renderiza en esa ruta

#### 🧩 Features (`src/features/`)

Organización por dominio de negocio (admin, auth, user, home). Cada feature contiene:

- Componentes de página
- Lógica específica del dominio
- Facilita el mantenimiento y escalabilidad

#### 🔄 Contexts (`src/contexts/`)

Manejo de estado global con React Context:

- **AuthContext**: Estado de autenticación del usuario
- **ThemeContext**: Estado del tema (claro/oscuro)

---

## 🚀 Instalación

### Paso 1: Clonar o Navegar al Proyecto

Si tienes el proyecto en un repositorio:

```bash
git clone <url-del-repositorio>
cd lms-front
```

O si ya estás en la carpeta del proyecto:

```bash
cd lms-front
```

### Paso 2: Instalar Dependencias

El proyecto usa **pnpm** como gestor de paquetes (recomendado), pero también puedes usar npm o yarn:

#### Opción A: Usando pnpm (Recomendado)

```bash
pnpm install
```

#### Opción B: Usando npm

```bash
npm install
```

#### Opción C: Usando yarn

```bash
yarn install
```

> ⚠️ **Nota**: Si usas npm o yarn, es posible que necesites eliminar `pnpm-lock.yaml` y generar un nuevo archivo de lock correspondiente.

### Paso 3: Verificar la Instalación

Después de instalar, verifica que todo esté correcto:

```bash
# Verificar que las dependencias se instalaron
ls node_modules

# Verificar que puedes ejecutar los scripts
npm run --help
# o
pnpm run --help
```

---

## ⚙️ Configuración

### Variables de Entorno

Actualmente, el proyecto **no requiere variables de entorno** para funcionar en modo desarrollo, ya que utiliza autenticación mock. Sin embargo, si planeas conectar con un backend real, necesitarás crear un archivo `.env.local`:

```bash
# Crear archivo .env.local en la raíz del proyecto
touch .env.local
```

Ejemplo de contenido para `.env.local` (cuando se integre con backend):

```env
# URL del backend API
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Otras variables de entorno que necesites
NEXT_PUBLIC_APP_NAME=LMS Frontend
```

> 📝 **Nota**: Los archivos `.env.local` no se suben al repositorio (están en `.gitignore`).

### Configuración de TypeScript

El proyecto está configurado con TypeScript. La configuración está en `tsconfig.json`:

- **Path aliases**: `@/*` apunta a `./src/*`
- **Strict mode**: Habilitado para mayor seguridad de tipos
- **Target**: ES2017

### Configuración de Next.js

La configuración básica está en `next.config.ts`. Actualmente está vacía, pero puedes agregar:

- Redirecciones
- Headers personalizados
- Variables de entorno públicas
- Optimizaciones de imágenes

---

## 🏃 Ejecución del Proyecto

### Modo Desarrollo

Para iniciar el servidor de desarrollo:

```bash
# Con pnpm
pnpm dev

# Con npm
npm run dev

# Con yarn
yarn dev
```

El servidor se iniciará en: **http://localhost:3000**

Abre tu navegador y visita esa URL. Verás la aplicación funcionando con:

- Hot reload automático (los cambios se reflejan sin recargar)
- Errores en tiempo real en la consola y en el navegador

### Modo Producción

Para construir y ejecutar en modo producción:

```bash
# 1. Construir la aplicación
pnpm build
# o
npm run build

# 2. Iniciar el servidor de producción
pnpm start
# o
npm start
```

### Scripts Disponibles

Según `package.json`, tienes estos scripts:

```json
{
  "dev": "next dev",        # Servidor de desarrollo
  "build": "next build",    # Construir para producción
  "start": "next start",    # Servidor de producción
  "lint": "eslint"          # Linter de código
}
```

---

## 🏗️ Arquitectura y Tecnologías

### Stack Tecnológico

| Tecnología       | Versión | Propósito                   |
| ---------------- | ------- | --------------------------- |
| **Next.js**      | 16.0.3  | Framework React con SSR/SSG |
| **React**        | 19.2.0  | Biblioteca UI               |
| **TypeScript**   | ^5      | Tipado estático             |
| **Tailwind CSS** | ^4      | Framework de estilos        |
| **React Icons**  | ^5.5.0  | Iconos                      |
| **ESLint**       | ^9      | Linter de código            |

### Patrones de Arquitectura

1. **App Router de Next.js**: Sistema de enrutamiento basado en archivos
2. **Server Components y Client Components**:
   - Por defecto, los componentes son Server Components
   - Usa `"use client"` para Client Components (interactividad)
3. **Context API**: Para estado global (auth, theme)
4. **Feature-based Structure**: Organización por características de negocio
5. **Protected Routes**: Componente `ProtectedRoute` para control de acceso

### Flujo de Autenticación

```
Usuario → Login/Register → AuthContext → localStorage → ProtectedRoute → Dashboard
```

1. Usuario ingresa credenciales
2. `AuthContext` maneja la autenticación
3. Estado se guarda en `localStorage`
4. `ProtectedRoute` verifica autenticación y rol
5. Redirige al dashboard correspondiente

---

## 🔐 Autenticación

### Sistema Actual (Mock)

El proyecto actualmente usa **autenticación mock** (`src/lib/mockAuth.ts`). Esto significa que:

- ✅ No requiere backend para funcionar
- ✅ Los datos se guardan en `localStorage` del navegador
- ⚠️ Los datos se pierden al limpiar el navegador
- ⚠️ No es seguro para producción

### Credenciales de Prueba

El sistema incluye usuarios de prueba predefinidos:

#### Usuario Normal

- **Email**: `user@test.com`
- **Password**: `password123`
- **Rol**: `user`
- **Acceso**: Dashboard de usuario, catálogo de cursos

#### Administrador

- **Email**: `admin@test.com`
- **Password**: `admin123`
- **Rol**: `admin`
- **Acceso**: Dashboard de admin, gestión de cursos y usuarios

### Migración a Backend Real

Cuando integres con un backend real, necesitarás:

1. **Crear servicio de API** (`src/lib/api.ts`):

   ```typescript
   const API_URL = process.env.NEXT_PUBLIC_API_URL;

   export async function login(email: string, password: string) {
     const response = await fetch(`${API_URL}/auth/login`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ email, password }),
     });
     return response.json();
   }
   ```

2. **Actualizar AuthContext**: Reemplazar llamadas a `mockAuth` con llamadas a la API

3. **Manejar tokens JWT**: Guardar tokens en lugar de datos de usuario completos

---

## 🔍 Solución de Problemas

### Problema: Error al instalar dependencias

**Solución**:

```bash
# Limpiar caché y reinstalar
rm -rf node_modules
rm pnpm-lock.yaml  # o package-lock.json / yarn.lock
pnpm install
```

### Problema: Puerto 3000 ya está en uso

**Solución**:

```bash
# Usar otro puerto
pnpm dev -- -p 3001
```

### Problema: Errores de TypeScript

**Solución**:

```bash
# Verificar configuración
npx tsc --noEmit

# Reinstalar tipos
pnpm add -D @types/node @types/react @types/react-dom
```

### Problema: Estilos no se aplican

**Solución**:

- Verifica que `globals.css` esté importado en `layout.tsx`
- Verifica que Tailwind esté configurado en `postcss.config.mjs`
- Reinicia el servidor de desarrollo

### Problema: Autenticación no persiste

**Solución**:

- Verifica que `localStorage` esté habilitado en tu navegador
- No uses modo incógnito (puede bloquear localStorage)
- Verifica la consola del navegador para errores

---

## 📝 Notas Adicionales

### Próximos Pasos Recomendados

1. **Integrar Backend Real**: Reemplazar `mockAuth` con llamadas a API
2. **Agregar Tests**: Configurar Jest/Vitest para testing
3. **Configurar CI/CD**: Automatizar despliegues
4. **Optimizar Performance**: Implementar lazy loading, code splitting
5. **Agregar Internacionalización**: Soporte multi-idioma (i18n)

### Recursos Útiles

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de React](https://react.dev)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)

---

## ✅ Checklist de Configuración

Antes de comenzar a desarrollar, verifica:

- [ ] Node.js 18+ instalado
- [ ] pnpm/npm/yarn instalado
- [ ] Dependencias instaladas (`pnpm install`)
- [ ] Servidor de desarrollo funcionando (`pnpm dev`)
- [ ] Aplicación accesible en http://localhost:3000
- [ ] Puedes iniciar sesión con credenciales de prueba
- [ ] Tema claro/oscuro funciona
- [ ] No hay errores en la consola del navegador

---

**¡Listo!** 🎉 Ya tienes todo lo necesario para comenzar a desarrollar en el proyecto LMS Frontend.

Si encuentras algún problema no mencionado aquí, revisa los logs del servidor y la consola del navegador para más detalles.
