import Jimp from 'jimp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/process-image', async (req, res) => {
    const imageUrl = req.body.imageUrl;

    try {
        const image = await Jimp.read(imageUrl);
        const imageName = `${uuidv4()}.jpeg`;
        const outputPath = path.join(__dirname, 'public', 'images', imageName);

        await image
            .resize(350, Jimp.AUTO)
            .greyscale()
            .writeAsync(outputPath);

        res.send(`<h1>Imagen Procesada</h1><p><a href="/images/${imageName}">Ver Imagen</a></p>`);
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error al procesar la imagen.');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
