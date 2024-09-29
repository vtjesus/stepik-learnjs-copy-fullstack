import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	out: './src/drizzle',
	schema: './src/drizzle/schema.ts',
	dbCredentials: {
		host: process.env.NEXT_PUBLIC_POSTGRES_HOST!,
		port: Number(process.env.NEXT_PUBLIC_POSTGRES_PORT!),
		user: process.env.NEXT_PUBLIC_POSTGRES_USER!,
		password: process.env.NEXT_PUBLIC_POSTGRES_PASSWORD!,
		database: process.env.NEXT_PUBLIC_POSTGRES_DATABASE!,
	},
	verbose: true,
	strict: true,
});
