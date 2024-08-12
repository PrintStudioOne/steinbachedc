<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/templates/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$news = array(
  'post_type' => 'news',
  'post_status' => 'publish',
	'posts_per_page' => -1
);

$team = array(
  'post_type' => 'team',
  'post_status' => 'publish',
	'posts_per_page' => -1
);

$context              = Timber::context();
$context['news']      = Timber::get_posts($news);
$context['news_tags'] = Timber::get_terms('post_tag', array(
  'taxonomy' => 'post_tag',
  'object_type' => array('news')
));
$context['team']      = Timber::get_posts($team);

$timber_post     = new Timber\Post();
$context['post'] = $timber_post;

Timber::render( array( 'page-' . $timber_post->post_name . '.twig', 'page.twig' ), $context );
