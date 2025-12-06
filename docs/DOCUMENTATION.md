# 📖 Documentación Técnica del Proyecto LMS Frontend

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Estructura de Carpetas Detallada](#estructura-de-carpetas-detallada)
4. [Sistema de Enrutamiento](#sistema-de-enrutamiento)
5. [Componentes Principales](#componentes-principales)
6. [Contextos y Estado Global](#contextos-y-estado-global)
7. [Features y Organización por Dominio](#features-y-organización-por-dominio)
8. [Flujos de la Aplicación](#flujos-de-la-aplicación)
9. [Patrones de Diseño](#patrones-de-diseño)
10. [Convenciones de Código](#convenciones-de-código)

---

## 🎯 Visión General

Este proyecto es un **Learning Management System (LMS)** desarrollado con **Next.js 16** y **React 19**. La aplicación permite gestionar cursos, usuarios y proporciona dashboards diferenciados para administradores y usuarios regulares.

### Características Principales

- ✅ **Autenticación con roles**: Usuario y Administrador
- ✅ **Rutas protegidas**: Control de acceso basado en autenticación y roles
- ✅ **Dashboards diferenciados**: Interfaces específicas según el tipo de usuario
- ✅ **Gestión de cursos**: CRUD completo para administradores
- ✅ **Gestión de usuarios**: Administración de usuarios (solo admins)
- ✅ **Tema claro/oscuro**: Sistema de temas personalizable
- ✅ **Responsive**: Diseño adaptable a diferentes dispositivos

---

## 🏗️ Arquitectura del Proyecto

### Arquitectura General

El proyecto sigue una **arquitectura híbrida** que combina:

1. **App Router de Next.js**: Enrutamiento basado en el sistema de archivos
2. **Feature-based Structure**: Organización por características de negocio
3. **Component-based Architecture**: Componentes reutilizables
4. **Context API**: Estado global compartido

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
│                  (src/app/*)                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  Public  │  │   Auth   │  │ Protected│            │
│  │  Routes  │  │  Routes  │  │  Routes  │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Features (src/features/*)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │   Auth   │  │   Admin  │  │   User   │            │
│  │ Features │  │ Features │  │ Features │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│         Contexts & Components (src/contexts,             │
│                    src/components)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │   Auth   │  │  Theme   │  │ Protected│            │
│  │ Context  │  │ Context  │  │  Route   │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Utilities (src/lib/*)                       │
│              mockAuth.ts                                 │
└─────────────────────────────────────────────────────────┘
```

### Flujo de Datos

```
Usuario → Página (app/*) → Feature Component → Context/API → Estado Global
```

---

## 📁 Estructura de Carpetas Detallada

### Estructura Completa del Proyecto

```
lms-front/
│
├── 📂 public/                          # Recursos estáticos
│   └── *.svg                           # Iconos y assets
│
├── 📂 src/                             # Código fuente principal
│   │
│   ├── 📂 app/                         # ⭐ App Router de Next.js
│   │   │
│   │   ├── 📂 (home)/                  # Route Group (no afecta URL)
│   │   │   └── home/
│   │   │       └── page.tsx           # Página pública de inicio
│   │   │
│   │   ├── 📂 admin/                   # Rutas de administrador
│   │   │   ├── layout.tsx              # Layout con protección admin
│   │   │   ├── admin-dashboard/
│   │   │   │   └── page.tsx           # Dashboard admin
│   │   │   ├── admin-courses/
│   │   │   │   ├── page.tsx           # Lista de cursos
│   │   │   │   ├── [courseId]/
│   │   │   │   │   └── page.tsx       # Detalle de curso (dinámico)
│   │   │   │   ├── new-course/
│   │   │   │   │   └── page.tsx       # Crear curso
│   │   │   │   └── edit-course/
│   │   │   │       └── page.tsx       # Editar curso
│   │   │   └── admin-users/
│   │   │       ├── page.tsx           # Lista de usuarios
│   │   │       ├── [userId]/
│   │   │       │   └── page.tsx       # Detalle de usuario
│   │   │       ├── new-user/
│   │   │       │   └── page.tsx       # Crear usuario
│   │   │       └── edit-user/
│   │   │           └── page.tsx       # Editar usuario
│   │   │
│   │   ├── 📂 auth/                    # Rutas de autenticación
│   │   │   ├── layout.tsx              # Layout simple para auth
│   │   │   ├── login/
│   │   │   │   └── page.tsx           # Página de login
│   │   │   └── register/
│   │   │       └── page.tsx           # Página de registro
│   │   │
│   │   ├── 📂 user/                    # Rutas de usuario
│   │   │   ├── layout.tsx              # Layout con protección user
│   │   │   ├── user-dashboard/
│   │   │   │   └── page.tsx           # Dashboard usuario
│   │   │   ├── user-courses/
│   │   │   │   ├── page.tsx           # Catálogo de cursos
│   │   │   │   └── [courseId]/
│   │   │   │       └── page.tsx       # Detalle de curso
│   │   │   └── user-my-courses/
│   │   │       ├── page.tsx           # Mis cursos
│   │   │       └── [courseId]/
│   │   │           └── page.tsx       # Ver curso inscrito
│   │   │
│   │   ├── layout.tsx                  # ⭐ Layout raíz (toda la app)
│   │   ├── page.tsx                    # Página raíz (redirige a /home)
│   │   ├── globals.css                 # Estilos globales
│   │   ├── error.tsx                   # Error boundary global
│   │   ├── loading.tsx                 # Loading global
│   │   └── not-found.tsx               # Página 404
│   │
│   ├── 📂 components/                   # Componentes reutilizables
│   │   ├── AdminSidebar.tsx            # Sidebar del admin
│   │   ├── ProtectedRoute.tsx          # ⭐ Protección de rutas
│   │   ├── Providers.tsx               # ⭐ Proveedores de contexto
│   │   └── ThemeToggle.tsx             # Toggle de tema
│   │
│   ├── 📂 contexts/                     # Contextos de React
│   │   ├── AuthContext.tsx             # ⭐ Contexto de autenticación
│   │   └── ThemeContext.tsx            # Contexto de tema
│   │
│   ├── 📂 features/                     # ⭐ Features organizadas por dominio
│   │   │
│   │   ├── 📂 admin/                    # Features de administrador
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
│   │   ├── 📂 auth/                     # Features de autenticación
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   │
│   │   ├── 📂 home/                     # Features de página pública
│   │   │   └── HomePage.tsx
│   │   │
│   │   └── 📂 user/                      # Features de usuario
│   │       ├── UserDashboard/
│   │       │   └── UserDashboardPage.tsx
│   │       ├── UserCourses/
│   │       │   ├── UserCoursesPage.tsx
│   │       │   └── UserCoursePage.tsx
│   │       └── UserMyCourses/
│   │           ├── UserMyCoursesPage.tsx
│   │           └── MyCoursePage.tsx
│   │
│   └── 📂 lib/                          # Utilidades y helpers
│       └── mockAuth.ts                  # Autenticación mock
│
└── 📄 Archivos de configuración...
```

### Explicación Detallada de Cada Carpeta

#### 🗂️ `src/app/` - App Router de Next.js

Esta es la **carpeta más importante** del proyecto. Next.js 16 usa el **App Router** basado en el sistema de archivos, donde:

- **Cada carpeta** = una ruta en la URL
- **`page.tsx`** = el componente que se renderiza en esa ruta
- **`layout.tsx`** = el layout que envuelve las rutas hijas
- **`(nombre)`** = route groups (no afectan la URL, solo organización)
- **`[parametro]`** = rutas dinámicas (parámetros)

**Ejemplo práctico:**

```
src/app/admin/admin-courses/[courseId]/page.tsx
```

Se traduce a la URL: `/admin/admin-courses/123` donde `123` es el `courseId`.

#### 🧩 `src/features/` - Organización por Dominio

Esta carpeta contiene **toda la lógica de negocio** organizada por características:

- **`admin/`**: Todo lo relacionado con administración
- **`auth/`**: Autenticación y registro
- **`user/`**: Funcionalidades para usuarios
- **`home/`**: Página pública

**Ventajas de esta estructura:**

- ✅ Fácil de encontrar código relacionado
- ✅ Escalable (fácil agregar nuevas features)
- ✅ Separación de responsabilidades
- ✅ Facilita el trabajo en equipo

#### 🔄 `src/contexts/` - Estado Global

Contiene los **Context Providers** de React que manejan estado global:

- **`AuthContext`**: Estado del usuario autenticado
- **`ThemeContext`**: Estado del tema (claro/oscuro)

#### 🧱 `src/components/` - Componentes Reutilizables

Componentes que se usan en múltiples lugares:

- **`ProtectedRoute`**: Protege rutas según autenticación/rol
- **`Providers`**: Envuelve la app con todos los contextos
- **`AdminSidebar`**: Navegación lateral del admin
- **`ThemeToggle`**: Botón para cambiar tema

#### 📚 `src/lib/` - Utilidades

Funciones y utilidades compartidas:

- **`mockAuth.ts`**: Sistema de autenticación mock (temporal)

---

## 🛣️ Sistema de Enrutamiento

### Cómo Funciona el Enrutamiento

Next.js 16 usa el **App Router**, que funciona así:

```
Carpeta en src/app/          →  URL en el navegador
─────────────────────────────────────────────────────
app/page.tsx                 →  /
app/home/page.tsx            →  /home
app/auth/login/page.tsx      →  /auth/login
app/admin/admin-dashboard/  →  /admin/admin-dashboard
  page.tsx
app/admin/admin-courses/     →  /admin/admin-courses
  [courseId]/page.tsx        →  /admin/admin-courses/123
```

### Tipos de Rutas

#### 1. Rutas Estáticas

```typescript
// src/app/admin/admin-dashboard/page.tsx
export default function Page() {
    return <AdminDashboardPage />;
}
```

**URL resultante:** `/admin/admin-dashboard`

#### 2. Rutas Dinámicas

```typescript
// src/app/admin/admin-courses/[courseId]/page.tsx
export default function Page({ params }: { params: { courseId: string } }) {
    return <CourseDetailsPage courseId={params.courseId} />;
}
```

**URL resultante:** `/admin/admin-courses/123` (donde `123` es el `courseId`)

#### 3. Route Groups

```typescript
// src/app/(home)/home/page.tsx
```

Los paréntesis `(home)` crean un grupo que **no afecta la URL**. Útil para:
- Organizar rutas sin cambiar URLs
- Aplicar layouts específicos a grupos de rutas

**URL resultante:** `/home` (no `/home/home`)

### Jerarquía de Layouts

Los layouts se aplican de forma **jerárquica**:

```
Root Layout (app/layout.tsx)
    └── Auth Layout (app/auth/layout.tsx)
    └── Admin Layout (app/admin/layout.tsx)
        └── Todas las rutas /admin/*
    └── User Layout (app/user/layout.tsx)
        └── Todas las rutas /user/*
```

**Ejemplo:** Cuando visitas `/admin/admin-dashboard`, se aplican:
1. `app/layout.tsx` (root)
2. `app/admin/layout.tsx` (admin)

### Protección de Rutas

Las rutas protegidas usan el componente `ProtectedRoute`:

```typescript
// app/admin/layout.tsx
export default function AdminLayout({ children }) {
    return (
        <ProtectedRoute requireAdmin={true}>
            {children}
        </ProtectedRoute>
    );
}
```

**Flujo de protección:**

```
Usuario intenta acceder → ProtectedRoute verifica:
    ├── ¿Está autenticado? → NO → Redirige a /auth/login
    ├── ¿Requiere admin? → SÍ → ¿Es admin? → NO → Redirige a /user/user-dashboard
    └── Todo OK → Muestra el contenido
```

---

## 🧩 Componentes Principales

### 1. `Providers.tsx` - Proveedores de Contexto

**Ubicación:** `src/components/Providers.tsx`

**Propósito:** Envuelve toda la aplicación con los contextos necesarios.

```typescript
export function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
```

**Uso:** Se importa en `app/layout.tsx` para que todos los componentes tengan acceso a los contextos.

### 2. `ProtectedRoute.tsx` - Protección de Rutas

**Ubicación:** `src/components/ProtectedRoute.tsx`

**Propósito:** Protege rutas según autenticación y rol.

**Props:**
- `children`: Contenido a proteger
- `requireAdmin?`: Si requiere rol de administrador

**Lógica:**
1. Verifica si el usuario está autenticado
2. Si requiere admin, verifica el rol
3. Redirige según corresponda
4. Muestra loading mientras verifica

### 3. `AdminSidebar.tsx` - Navegación del Admin

**Ubicación:** `src/components/AdminSidebar.tsx`

**Propósito:** Barra lateral de navegación para administradores.

**Características:**
- Navegación entre secciones del admin
- Indicador de ruta activa
- Botón de logout
- Diseño responsive

### 4. `ThemeToggle.tsx` - Toggle de Tema

**Ubicación:** `src/components/ThemeToggle.tsx`

**Propósito:** Permite cambiar entre tema claro y oscuro.

**Funcionalidad:**
- Usa `ThemeContext` para cambiar el tema
- Persiste la preferencia en `localStorage`
- Aplica el tema al `document.documentElement`

---

## 🔄 Contextos y Estado Global

### 1. `AuthContext.tsx` - Contexto de Autenticación

**Ubicación:** `src/contexts/AuthContext.tsx`

**Propósito:** Maneja el estado de autenticación en toda la aplicación.

**Estado que maneja:**
- `user`: Usuario actual autenticado
- `loading`: Estado de carga
- `isAuthenticated`: Boolean de autenticación

**Métodos proporcionados:**
- `login(email, password)`: Inicia sesión
- `register(name, email, password)`: Registra nuevo usuario
- `logout()`: Cierra sesión

**Flujo de autenticación:**

```
1. Usuario ingresa credenciales
2. AuthContext llama a mockAuth.login()
3. Si es exitoso, guarda usuario en estado
4. Guarda en localStorage
5. Redirige según rol:
   - admin → /admin/admin-dashboard
   - user → /user/user-dashboard
```

**Uso en componentes:**

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
    const { user, isAuthenticated, login, logout } = useAuth();
    
    // Usar el estado y métodos...
}
```

### 2. `ThemeContext.tsx` - Contexto de Tema

**Ubicación:** `src/contexts/ThemeContext.tsx`

**Propósito:** Maneja el tema claro/oscuro de la aplicación.

**Estado que maneja:**
- `theme`: 'light' | 'dark'

**Métodos proporcionados:**
- `toggleTheme()`: Alterna entre claro y oscuro
- `setTheme(theme)`: Establece un tema específico

**Persistencia:**
- Guarda la preferencia en `localStorage`
- Aplica el tema al `document.documentElement` con atributo `data-theme`

**Uso:**

```typescript
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
    const { theme, toggleTheme } = useTheme();
    
    return <button onClick={toggleTheme}>Toggle Theme</button>;
}
```

---

## 🎯 Features y Organización por Dominio

### Estructura de Features

Cada feature contiene **toda la lógica relacionada** con ese dominio:

```
features/
├── admin/          # Todo lo de administración
├── auth/           # Autenticación
├── home/           # Página pública
└── user/           # Funcionalidades de usuario
```

### Feature: Admin

**Ubicación:** `src/features/admin/`

**Componentes:**
- `AdminDashboardPage.tsx`: Dashboard principal del admin
- `AdminCoursesPage.tsx`: Lista y gestión de cursos
- `CourseDetailsPage.tsx`: Detalles de un curso
- `NewCoursePage.tsx`: Formulario para crear curso
- `EditCoursePage.tsx`: Formulario para editar curso
- `AdminUsersPage.tsx`: Lista y gestión de usuarios
- `AdminUserDetailsPage.tsx`: Detalles de un usuario
- `NewUserPage.tsx`: Formulario para crear usuario
- `EditUserPage.tsx`: Formulario para editar usuario

**Patrón de uso:**

```typescript
// app/admin/admin-courses/page.tsx
import AdminCoursesPage from "@/features/admin/AdminCoursesPage";

export default function Page() {
    return <AdminCoursesPage />;
}
```

### Feature: Auth

**Ubicación:** `src/features/auth/`

**Componentes:**
- `LoginPage.tsx`: Página de inicio de sesión
- `RegisterPage.tsx`: Página de registro

**Características:**
- Validación de formularios
- Manejo de errores
- Integración con `AuthContext`
- Redirección automática según rol

### Feature: User

**Ubicación:** `src/features/user/`

**Estructura:**
```
user/
├── UserDashboard/
│   └── UserDashboardPage.tsx
├── UserCourses/
│   ├── UserCoursesPage.tsx      # Catálogo
│   └── UserCoursePage.tsx       # Detalle de curso
└── UserMyCourses/
    ├── UserMyCoursesPage.tsx    # Mis cursos
    └── MyCoursePage.tsx         # Ver curso inscrito
```

### Feature: Home

**Ubicación:** `src/features/home/`

**Componentes:**
- `HomePage.tsx`: Página pública de inicio

**Funcionalidad:**
- Landing page pública
- Redirige automáticamente si el usuario está autenticado
- Muestra información sobre la plataforma

---

## 🔀 Flujos de la Aplicación

### Flujo 1: Inicio de Sesión

```
1. Usuario visita /auth/login
2. Ingresa email y password
3. LoginPage llama a AuthContext.login()
4. AuthContext valida con mockAuth.login()
5. Si es válido:
   ├── Guarda usuario en estado
   ├── Guarda en localStorage
   └── Redirige según rol:
       ├── admin → /admin/admin-dashboard
       └── user → /user/user-dashboard
6. Si es inválido:
   └── Muestra error
```

### Flujo 2: Navegación Protegida

```
1. Usuario intenta acceder a /admin/admin-dashboard
2. AdminLayout envuelve con ProtectedRoute(requireAdmin=true)
3. ProtectedRoute verifica:
   ├── ¿Está autenticado? → NO → Redirige a /auth/login
   ├── ¿Es admin? → NO → Redirige a /user/user-dashboard
   └── Todo OK → Muestra contenido
```

### Flujo 3: Registro de Usuario

```
1. Usuario visita /auth/register
2. Completa formulario (name, email, password)
3. RegisterPage llama a AuthContext.register()
4. AuthContext valida con mockAuth.register()
5. Si es válido:
   ├── Crea nuevo usuario (rol: 'user')
   ├── Guarda en estado y localStorage
   └── Redirige a /user/user-dashboard
6. Si email existe:
   └── Muestra error
```

### Flujo 4: Cambio de Tema

```
1. Usuario hace clic en ThemeToggle
2. ThemeToggle llama a ThemeContext.toggleTheme()
3. ThemeContext:
   ├── Cambia el estado (light ↔ dark)
   ├── Guarda en localStorage
   └── Actualiza document.documentElement.setAttribute('data-theme', theme)
4. CSS variables se actualizan automáticamente
5. Toda la UI cambia de tema
```

### Flujo 5: Cierre de Sesión

```
1. Usuario hace clic en "Logout"
2. Se llama a AuthContext.logout()
3. AuthContext:
   ├── Limpia el estado (setUser(null))
   ├── Elimina de localStorage
   └── Redirige a /home
4. ProtectedRoute detecta que no hay usuario
5. Redirige a /auth/login si intenta acceder a rutas protegidas
```

---

## 🎨 Patrones de Diseño

### 1. Patrón: Container/Presentational

**Separación entre:**
- **Containers** (`app/*/page.tsx`): Manejan routing y lógica
- **Presentational** (`features/*`): Componentes de UI puros

**Ejemplo:**

```typescript
// Container (app/admin/admin-dashboard/page.tsx)
import AdminDashboardPage from "@/features/admin/AdminDashboardPage";

export default function Page() {
    return <AdminDashboardPage />;
}
```

```typescript
// Presentational (features/admin/AdminDashboardPage.tsx)
export default function AdminDashboardPage() {
    // Lógica y UI aquí
}
```

### 2. Patrón: Provider Pattern

**Uso de Context API** para compartir estado:

```typescript
// Provider
<AuthProvider>
    <ThemeProvider>
        {children}
    </ThemeProvider>
</AuthProvider>

// Consumer
const { user } = useAuth();
```

### 3. Patrón: Higher-Order Component (HOC)

**`ProtectedRoute`** actúa como HOC:

```typescript
<ProtectedRoute requireAdmin={true}>
    <AdminDashboard />
</ProtectedRoute>
```

### 4. Patrón: Feature-based Organization

**Agrupación por dominio de negocio** en lugar de por tipo de archivo:

```
❌ Mal (por tipo):
components/
  AdminComponents/
  UserComponents/

✅ Bien (por feature):
features/
  admin/
  user/
```

### 5. Patrón: Layout Composition

**Composición de layouts** en Next.js:

```
RootLayout
  └── AdminLayout
      └── AdminDashboard
```

---

## 📝 Convenciones de Código

### Nomenclatura de Archivos

- **Componentes:** `PascalCase.tsx` (ej: `AdminDashboardPage.tsx`)
- **Utilidades:** `camelCase.ts` (ej: `mockAuth.ts`)
- **Páginas:** `page.tsx` (convención de Next.js)
- **Layouts:** `layout.tsx` (convención de Next.js)

### Estructura de Componentes

```typescript
// 1. Imports
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

// 2. Tipos/Interfaces
interface Props {
    title: string;
}

// 3. Componente
export default function MyComponent({ title }: Props) {
    // 4. Hooks
    const { user } = useAuth();
    
    // 5. Lógica
    const handleClick = () => {
        // ...
    };
    
    // 6. Render
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
}
```

### Uso de Path Aliases

El proyecto usa el alias `@/` para `src/`:

```typescript
// ✅ Correcto
import { useAuth } from '@/contexts/AuthContext';
import AdminPage from '@/features/admin/AdminPage';

// ❌ Evitar
import { useAuth } from '../../../contexts/AuthContext';
```

### Client vs Server Components

**Server Components (por defecto):**
```typescript
// No necesita "use client"
export default function ServerComponent() {
    return <div>Server Component</div>;
}
```

**Client Components (cuando necesitas interactividad):**
```typescript
"use client"; // ⚠️ Necesario para hooks, eventos, etc.

import { useState } from 'react';

export default function ClientComponent() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Manejo de Estado

- **Estado local:** `useState` dentro del componente
- **Estado global:** Context API (`AuthContext`, `ThemeContext`)
- **Estado del servidor:** Server Components de Next.js

### Estilos

- **Tailwind CSS:** Clases utilitarias
- **CSS Variables:** Para temas (definidas en `globals.css`)
- **Estilos inline:** Solo cuando es necesario (ej: `style={{ color: 'var(--text-primary)' }}`)

---

## 🔍 Puntos Clave para Entender el Proyecto

### 1. Separación de Responsabilidades

```
app/          → Routing y estructura
features/     → Lógica de negocio
components/   → Componentes reutilizables
contexts/     → Estado global
lib/          → Utilidades
```

### 2. Flujo de Datos

```
Usuario → Página (app) → Feature → Context → Estado → UI
```

### 3. Protección de Rutas

Todas las rutas protegidas usan `ProtectedRoute` en sus layouts:
- `app/admin/layout.tsx` → `requireAdmin={true}`
- `app/user/layout.tsx` → Protección básica

### 4. Autenticación Mock

Actualmente usa `mockAuth.ts` que:
- Guarda en `localStorage`
- No requiere backend
- Es temporal (debe migrarse a API real)

### 5. Sistema de Temas

- Usa CSS variables
- Persiste en `localStorage`
- Se aplica con atributo `data-theme` en `<html>`

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Context API](https://react.dev/reference/react/useContext)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Conceptos Clave

1. **App Router:** Sistema de enrutamiento basado en archivos de Next.js
2. **Server Components:** Componentes renderizados en el servidor (por defecto)
3. **Client Components:** Componentes con interactividad (`"use client"`)
4. **Context API:** Sistema de estado global de React
5. **Route Groups:** Agrupación de rutas sin afectar URLs `(nombre)`
6. **Dynamic Routes:** Rutas con parámetros `[parametro]`

---

## ✅ Resumen Ejecutivo

Este proyecto LMS Frontend está estructurado de forma **modular y escalable**:

- ✅ **App Router** para enrutamiento intuitivo
- ✅ **Features** organizadas por dominio de negocio
- ✅ **Context API** para estado global
- ✅ **Componentes reutilizables** para UI común
- ✅ **Rutas protegidas** con control de acceso
- ✅ **Sistema de temas** personalizable

La arquitectura facilita:
- 🚀 Desarrollo rápido de nuevas features
- 🔍 Fácil localización de código
- 👥 Trabajo en equipo (pocos conflictos)
- 📈 Escalabilidad del proyecto

---

**¡Listo para desarrollar!** 🎉

Si tienes dudas sobre alguna parte específica del proyecto, consulta esta documentación o revisa el código fuente siguiendo los patrones establecidos.

