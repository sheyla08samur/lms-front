const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Inicializar router con la ruta absoluta al db.json
const dbPath = path.join(__dirname, 'db.json');
const router = jsonServer.router(dbPath);
const db = router.db;

// Configurar middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Habilitar CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware de autenticación simulado
server.use((req, res, next) => {
  // Permitir acceso público a login y register
  if (req.path === '/auth/login' || req.path === '/auth/register') {
    return next();
  }

  // Para otras rutas, verificar token (simulado)
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Permitir acceso para desarrollo, pero en producción requeriría token
    return next();
  }

  next();
});

// Rutas personalizadas para autenticación
server.post('/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = db.get('users').value();
    
    if (!users || !Array.isArray(users)) {
      return res.status(500).json({ error: 'Database error: users not found' });
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Simular token JWT
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.post('/auth/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const users = db.get('users').value();
    
    if (!users || !Array.isArray(users)) {
      return res.status(500).json({ error: 'Database error: users not found' });
    }
    
    // Verificar si el email ya existe
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    db.get('users').push(newUser).write();
    
    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`;
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware para agregar relaciones a enrollments
server.use((req, res, next) => {
  if (req.method === 'GET' && req.path.includes('/enrollments')) {
    const originalSend = res.json.bind(res);
    res.json = function(data) {
      try {
        if (Array.isArray(data)) {
          data = data.map(enrollment => {
            const course = db.get('courses').find({ id: enrollment.courseId }).value();
            const user = db.get('users').find({ id: enrollment.userId }).value();
            return {
              ...enrollment,
              course: course || null,
              user: user ? { id: user.id, name: user.name, email: user.email, role: user.role } : null
            };
          });
        } else if (data && data.courseId) {
          const course = db.get('courses').find({ id: data.courseId }).value();
          const user = db.get('users').find({ id: data.userId }).value();
          data = {
            ...data,
            course: course || null,
            user: user ? { id: user.id, name: user.name, email: user.email, role: user.role } : null
          };
        }
        return originalSend(data);
      } catch (error) {
        console.error('Enrollment expansion error:', error);
        return originalSend(data);
      }
    };
  }
  next();
});

// Usar router de json-server
server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});

