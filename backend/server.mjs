import { app } from './app.mjs';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(
		`Server running at http://localhost:${PORT} (${process.env.NODE_ENV})`
	);
});
