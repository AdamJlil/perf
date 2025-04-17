# Perf Application

## Project Structure

```
perf/
├── .husky/
├── .nuxt/
│   ├── dev/
│   ├── dist/
│   ├── manifest/
│   ├── schema/
│   ├── types/
│   ├── nitro.json
│   ├── nuxt.d.ts
│   ├── nuxt.json
│   ├── tsconfig.json
│   └── tsconfig.server.json
├── .vscode/
├── components/
│   ├── PageDescription.vue
│   ├── PageLink.vue
│   ├── PageTitle.vue
│   ├── PageUser.vue
│   ├── TableBodyCell.vue
│   └── TableHeaderCell.vue
├── composables/
│   ├── useAdmin.ts
│   ├── useAuth.ts
│   └── useAuthUser.ts
├── layouts/
│   └── default.vue
├── middleware/
│   ├── admin-only.ts
│   ├── guest-only.ts
│   └── user-only.ts
├── node_modules/
├── pages/
│   ├── admin.vue
│   ├── index.vue
│   ├── login.vue
│   └── private.vue
├── plugins/
│   └── auth.ts
├── public/
│   ├── images/
│   ├── videos/
│   ├── airbnb-179-svgrepo-com.svg
│   ├── booking-svgrepo-com.svg
│   ├── eye.png
│   ├── logo.jpeg
│   ├── logo2.jpeg
│   ├── logo3.svg
│   ├── logo4.svg
│   ├── noeye.png
│   └── twitter-2-svgrepo-com.svg
├── server/
│   ├── api/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── context.d.ts
├── .dockerignore
├── .editorconfig
├── .env.example
├── .eslintignore
├── .eslintrc.cjs
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc.cjs
├── app.vue
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
└── types.ts
```

## Docker Setup

### Prerequisites

- Docker and Docker Compose installed on your machine

### Running with Docker

1. Build and start the application:

```bash
docker-compose up --build
```

2. Access the application at http://localhost:3000

3. To run in detached mode (background):

```bash
docker-compose up -d
```

4. To stop the application:

```bash
docker-compose down
```

### Development with Docker

For development with hot-reload, you can modify the docker-compose.yml file to use the development server instead:

```yaml
command: ["npm", "run", "dev"]  # Replace the CMD in the service definition
```

## Running Without Docker

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run preview
```
