# Odoo-Astras

## Run the frontend

### 1) Install dependencies (only once)
From the repository root:

```bash
npm --prefix client install
```

### 2) Start frontend

```bash
npm run frontend
```

- Opens Vite dev server at: http://localhost:3000

### Backend URL
The frontend calls the API using `VITE_API_URL`.
Example is in:

- `client/.env.example`

By default it uses:
- `http://localhost:5000/api`

