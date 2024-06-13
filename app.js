import Jimp from 'jimp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetWidth = 350; // La anchura deseada para las imágenes procesadas

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/process-image', async (req, res) => {
    const imageUrl = req.body.imageUrl;

    try {
        const image = await Jimp.read(imageUrl);
        // Comprobar si la anchura de la imagen original es menor que la anchura deseada
        if (image.bitmap.width < targetWidth) {
            throw new Error('La resolución de la imagen es demasiado baja para ser procesada adecuadamente.');
        }

        const imageName = `${uuidv4()}.jpeg`;
        const outputPath = path.join(__dirname, 'public', 'images', imageName);

        await image
            .resize(targetWidth, Jimp.AUTO) // Redimensionar la imagen a 350px de ancho
            .greyscale() // Convertir la imagen a escala de grises
            .writeAsync(outputPath);

        res.send(`<h1>Imagen Procesada</h1><p><a href="/images/${imageName}">Ver Imagen</a></p>`);
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send(`Error al procesar la imagen: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
