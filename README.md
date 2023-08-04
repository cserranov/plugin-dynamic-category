# Dynamic Category Plugin

Este plugin para WordPress te permite cambiar el estilo del título de una entrada en función de su categoría seleccionada. El título se mostrará con un fondo y color de texto diferentes según la categoría asociada.

## Instalación

1. Descarga el plugin como archivo ZIP.
2. Accede al panel de administración de WordPress.
3. Ve a "Plugins" > "Añadir nuevo" > "Subir plugin".
4. Selecciona el archivo ZIP del plugin y haz clic en "Instalar ahora".
5. Activa el plugin.

## Uso

Una vez que el plugin está activado, se agrega un nuevo bloque llamado "Dynamic Category" al editor de bloques de WordPress. Este bloque permite editar el contenido de la entrada y cambiar los estilos del título.

### Cómo funciona

- Cuando creas o editas una entrada de tipo "post", el bloque "Dynamic Category" se encuentra disponible en el editor de bloques.
- Al seleccionar una categoría para la entrada, el título de la entrada adoptará automáticamente un fondo y color de texto asociados a la categoría seleccionada.
- El bloque guardará los metadatos de entrada con los colores de título asociados a la categoría.

## Ejemplo de código

En este repositorio, encontrarás dos códigos principales:

### Plugin PHP

El código PHP se encuentra en el archivo `dynamic-category.php` y contiene las siguientes funciones:

- `dynamic_category_block()`: Registra y encola el script JavaScript necesario para el funcionamiento del bloque en el editor de bloques.
- `my_custom_enqueue_styles()`: Agrega estilos CSS personalizados al título de la entrada basados en los metadatos almacenados.
- `titleStyles_register_post_meta()`: Registra el campo de metadatos personalizado "titleStyles" para almacenar los colores del título asociados a la categoría.

### Script JavaScript

El código JavaScript se encuentra en el archivo `dynamic_category_block.js` y contiene la implementación del bloque de categoría dinámica. El bloque utiliza la API de WordPress y el editor de bloques para cambiar los estilos del título en función de la categoría seleccionada.

## Contribuir

Si deseas contribuir a este proyecto, eres bienvenido/a. Puedes abrir un problema o enviar una solicitud de extracción con tus mejoras.

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

## Autor

Este plugin fue creado por [Carlos Enrique Serano Varela](https://github.com/cserranov).

---
¡Gracias por utilizar Dynamic Category Plugin! Esperamos que te sea útil. Si tienes alguna pregunta o problema, no dudes en abrir un problema en este repositorio.
