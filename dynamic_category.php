<?php
/*
Plugin Name: Dynamic Category
Version: 1.0.0
Description: Change the style when loading the block in post and entries.
Author: Carlos Enrique Serano Varela
Author URI: ,
*/

// Comprobar si se accede directamente al archivo. Si no, salir.
if (!defined('ABSPATH')) {
    exit;
}

// Función para cargar el script JavaScript en el editor de bloques.
function dynamic_category_block() {
    $block_path = plugins_url('dynamic_category_block.js', __FILE__);

    wp_enqueue_script(
        'dynamic-category-block',
        $block_path,
        array('wp-blocks', 'wp-element')
    );
    wp_enqueue_script('dynamic-category-block');
}

// Añadir la acción para cargar el script en el editor de bloques.
add_action('enqueue_block_editor_assets', 'dynamic_category_block');

// Función para agregar estilos personalizados al título de una entrada de tipo "post".
function my_custom_enqueue_styles() {
    // Verificar si se está visualizando una entrada de tipo "post".
    if (is_singular('post')) {
        $post_id = get_the_ID();
        // Obtener los estilos personalizados del título desde los metadatos del post.
        $title_styles = get_post_meta($post_id, 'titleStyles', true);
        
        if ($title_styles && is_array($title_styles)) {
            // Obtener los valores específicos de los estilos.
            $title_background = isset($title_styles['background']) ? $title_styles['background'] : '';
            $title_color = isset($title_styles['color']) ? $title_styles['color'] : '';

            // Agregar estilos CSS personalizados al título.
            echo "<style>.wp-block-post-title { background-color: {$title_background}; color: {$title_color}; }</style>";
        }
    }
}
// Añadir la acción para cargar estilos personalizados en la visualización del post.
add_action('wp_enqueue_scripts', 'my_custom_enqueue_styles');

// Registrar el campo de metadatos personalizado "titleStyles" para los posts.
function titleStyles_register_post_meta() {
    register_post_meta( 
        'post', 
        'titleStyles', 
        array(
            'single'       => true,
            'type'         => 'object',
            'show_in_rest' => array(
                'schema' => array(
                    'type'  => 'object',
                    'properties' => array(
                        'background'    => array(
                            'type' => 'string',
                        ),
                        'color' => array(
                            'type'   => 'string',
                        ),
                    ),
                ),
            ),
        ) 
    );
}
// Añadir la acción para registrar el campo de metadatos personalizado.
add_action( 'init', 'titleStyles_register_post_meta' );