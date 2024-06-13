# Proyecto de procesamiento de imagenes: Black And White

## Instrucciones

Este proyecto tiene incluido nodemon por lo tanto para importar el node_module el primer paso es ejecutar:
```
npm install
```
Luego el servidor local se ejecuta con:
```
npm run dev
```
## Descripción del proyecto

El proyecto permite ingresar a los usuarios un URL con el link de una imagen, luego de enviar la imagen se procesará para redimensionara la imagen usando 'resize' a un
tamaño de 350px y luego usando la misma libreria se utilizara el metodo greyscale() para convertir la imagen en escala de grises. Todo esto en el metodo POST del proyecto

### Rutas

todo funciona en la ruta raiz /, luego de introducir la imagen y enviarla automaticamente redirige a la ruta 
```
process-image
```
donde se proporciona un link de la carpeta public y particularmente un link de la imagen que sea a procesado.

### bonus
Se agrego una validación para que solo admita imagenes superiores de 350px dado que si era de una resolución menor, generaba un error debido a que no se podía redimensionar a una
resolución mayor :)
