<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}
	/** This is where you can register custom post types. */
	public function register_post_types() {

	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {

	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['foo']   = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::context();';
		$context['menu']  = new Timber\Menu();
		$context['site']  = $this;
		return $context;
	}

	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );
	}

	/** This Would return 'foo bar!'.
	 *
	 * @param string $text being 'foo', then returned 'foo bar!'.
	 */
	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		$twig->addFilter( new Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}

}

new StarterSite();

// END of default Timber code

// ========================================================================== //
// Load scripts and styles
// ========================================================================== //

add_action( 'wp_enqueue_scripts', 'scripts_and_styles' );
function scripts_and_styles() {
	// CSS (w/ version query)
	wp_enqueue_style( 'my-style', get_template_directory_uri() . '/static/css/main.css', array(), filemtime(get_template_directory() . '/static/css/main.css'));
	// JS
	wp_enqueue_script( 'my-script', get_template_directory_uri() . '/static/js/all.min.js', array('jquery'), true );
	// Slick slider
	wp_enqueue_script( 'slick-script', get_template_directory_uri() . '/slick/slick.min.js', array('jquery'), true );
	wp_enqueue_style( 'slick-style', get_template_directory_uri() . '/slick/slick.css');
	wp_enqueue_style( 'slick-style', get_template_directory_uri() . '/slick/slick-theme.css');
}

// ========================================================================== //
// WordPress back-end style
// ========================================================================== //

// ========================================================================== //
// - Login style

// -- Login style
add_action( 'login_enqueue_scripts', 'login_style' );								
function login_style() {
	wp_enqueue_style( 'wp-admin-style', get_theme_file_uri( 'admin_style.css' ) );
}

// -- Login logo url
add_filter( 'login_headerurl', 'login_logo_url' );
function login_logo_url() {
	return home_url();
}

// -- Login logo url title
add_filter( 'login_headertext', 'login_logo_url_title' );
function login_logo_url_title() {
	return 'Print Studio One';
}

// ========================================================================== //
// - Admin style
add_action( 'admin_head', 'admin_style' );
function admin_style() {
	wp_enqueue_style( 'wp-admin-style', get_theme_file_uri( 'admin_style.css' ) );
}

// ========================================================================== //
// Disable default posts
// ========================================================================== //

// Disable default posts from admin side menu
add_action( 'admin_menu', 'disable_default_posts' );
function disable_default_posts() {
	remove_menu_page( 'edit.php' );
}

// ========================================================================== //
// Disable comments
// ========================================================================== //

// Disable comments from admin top bar
add_action( 'wp_before_admin_bar_render', 'disable_comments_bar' );
function disable_comments_bar() {
	global $wp_admin_bar;
	$wp_admin_bar->remove_menu('comments');
}

// Disable comments from admin side menu
add_action( 'admin_menu', 'disable_comments_menu' );
function disable_comments_menu() {
	remove_menu_page( 'edit-comments.php' );
}

// Disable comments from posts and pages
add_action( 'init', 'disable_comments' );
function disable_comments() {
	remove_post_type_support( 'post', 'comments' );
	remove_post_type_support( 'page', 'comments' );
}

// ========================================================================== //
// Disable editor
// ========================================================================== //

add_action( 'admin_init', 'disable_editor' );
function disable_editor() {
	remove_post_type_support('page', 'editor');
}

// ========================================================================== //
// Add Options (ACF Pro)
// ========================================================================== //

add_filter( 'timber_context', 'enable_options' );
function enable_options($context) {
	$context['options'] = get_fields('option');
	return $context;
}
