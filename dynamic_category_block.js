document.addEventListener('DOMContentLoaded', () => {
    (async function() {
        const el = wp.element.createElement;
        const registerBlockType = wp.blocks.registerBlockType;
        const { select } = wp.data;

        // Función para obtener los colores de fondo y texto según la categoría.
        function getCategoryColors(category) {
            switch (category) {
                case 'nacional':
                    return {
                        background: '#00B049',
                        color: '#FFFFFF'
                    };
                case 'entretenimiento':
                    return {
                        background: '#FFC915',
                        color: '#FFFFFF'
                    };
                case 'tecnologia':
                    return {
                        background: '#00D3F8',
                        color: '#FFFFFF'
                    };
                case 'mascotas':
                    return {
                        background: '#90456D',
                        color: '#FFFFFF'
                    };
                case 'deportes':
                    return {
                        background: '#FF372C',
                        color: '#FFFFFF'
                    };
                default:
                    return {
                        background: '#FFF',
                        color: '#000'
                    };
            }
        }

        // Registrar un bloque dinámico de categoría.
        registerBlockType('dynamic-category/dynamic-category-block', {
            title: 'Dynamic Category',
            description: 'Un bloque para cambiar el estilo del título según la categoría seleccionada.',
            icon: 'category',
            category: 'common',
            // Función para editar el bloque (no se implementa en este código).
            edit: function(props) {
                // El código para la edición del bloque se puede agregar aquí.
            },
            // Función para guardar el bloque.
            save: async function(props) {
                // Obtener todas las categorías de WordPress mediante la API REST.
                const categories = await wp.apiFetch({ path: '/wp/v2/categories?per_page=-1' });

                // Obtener el ID de la categoría actual asociada a la entrada.
                const categoryId = select('core/editor').getCurrentPost().categories[0] || null;

                // Encontrar la categoría actual basada en el ID.
                const category = categories.find(cat => cat.id === categoryId);

                // Obtener el nombre de la categoría o establecer 'nacional' como valor predeterminado.
                const categoryName = category ? category.slug : 'nacional';

                // Obtener los colores correspondientes a la categoría.
                const categoryColors = getCategoryColors(categoryName);

                // Obtener el elemento del título de la entrada en el editor de bloques.
                const titleElement = document.querySelector('.editor-post-title__input');

                // Cambiar los estilos de fondo y texto del título según la categoría.
                if (titleElement) {
                    titleElement.style.backgroundColor = categoryColors.background;
                    titleElement.style.color = categoryColors.color;
                }

                // Obtener el ID de la entrada actual.
                const post_id = select('core/editor').getCurrentPostId();

                // Guardar los metadatos de entrada (colores de título).
                const postMeta = {
                    "titleStyles": categoryColors
                };
                const meta = { meta: postMeta };
                await wp.data.dispatch('core/editor').editPost(meta);

                // Devolver el elemento HTML renderizado con los colores de fondo y texto de la categoría.
                return (
                    el('p', {
                        style: {
                            backgroundColor: getCategoryColors(category).background,
                            color: getCategoryColors(category).color
                        }
                    })
                );
            }
        });
    })();
});
