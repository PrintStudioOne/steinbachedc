<?php
/**
 * The template for displaying 404 pages (Not Found)
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$locations = array(
  'post_type' => 'locations',
  'post_status' => 'publish',
	'posts_per_page' => -1
);

$context              = Timber::context();
$context['locations'] = Timber::get_posts($locations);
Timber::render( '404.twig', $context );
