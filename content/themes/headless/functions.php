<?php
/**
 * Theme functions.
 */

/**
 * Enqueue scripts/styles.
 *
 * @return void
 */
function headless_scripts() {
    wp_enqueue_style( 'headless-style', get_template_directory_uri() . '/style.css', array(), rand() );
}

add_action( 'wp_enqueue_scripts', 'headless_scripts' );

/*
 * Support for Featured Image
 */
add_theme_support("post-thumbnails");

/*
 * Load post types and taxonomies
 */

$arDirectories = array("post-types", "taxonomies");
foreach($arDirectories as $sDirectory){
	$sRealDirectory = $sDirectory;
	$sDirectory = __DIR__ . "/" . $sDirectory;
	if (is_dir($sDirectory) && is_readable($sDirectory)){
		if ($oHandle = opendir($sDirectory)){
			while(($sFile = readdir($oHandle)) !== false){
				if (($sFile != ".") && ($sFile != "..")){
					if ($sRealDirectory == "post-types"){

						/* Featured image and Excerpt for custom post type */
						add_post_type_support(basename($sFile, ".php"), array("thumbnail", "excerpt"));
					}
					include_once($sDirectory . "/" . $sFile);
				}
			}
			closedir($oHandle);
		}
		unset($oHandle);
	}
	unset($sDirectory);
}
