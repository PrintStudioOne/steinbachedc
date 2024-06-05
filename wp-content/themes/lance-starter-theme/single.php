<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$blog = array(
  'post_type' => 'blog',
  'post_status' => 'publish',
	'posts_per_page' => -1,
);

$locations = array(
  'post_type' => 'locations',
  'post_status' => 'publish',
	'posts_per_page' => -1
);

$context         			= Timber::context();
$context['blog'] 			= Timber::get_posts($blog);
$context['locations'] = Timber::get_posts($locations);

$timber_post     = Timber::query_post();
$context['post'] = $timber_post;
if ( post_password_required( $timber_post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $timber_post->ID . '.twig', 'single-' . $timber_post->post_type . '.twig', 'single-' . $timber_post->slug . '.twig', 'single.twig' ), $context );
}
