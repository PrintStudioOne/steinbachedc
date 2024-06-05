<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'lance_staging' );

/** Database username */
define( 'DB_USER', 'lance_staging' );

/** Database password */
define( 'DB_PASSWORD', 'Y8m!DYJezC6gHM2t' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'G@bcPI1CP(#jEcLend]G@U/bVYm7$tY$LBX~3{3ty`Q-V+%cGhJdL!efNv1,(E4|');
define('SECURE_AUTH_KEY',  'yj?NyIXaV1&pD}Jy!<&mt~&`K_b/bfSR$RhjE,L`17p/n$2GOj,GZ{zZ46|Ey:dY');
define('LOGGED_IN_KEY',    '9c`o67y0B/4ad+Fodp4ix+hb/A,ON8S+d_R$GVFFI[N+H/^rtAc9-~&gr)IZl9,X');
define('NONCE_KEY',        'EPA[JKu#*km%7P]VopAA:q5.KnSLU+wR?6`DB)K[NsG?c[GsI!#d,PY45rhZzjA9');
define('AUTH_SALT',        'l/VlCti9=>39O)tj7-sMU9?A_^7!ENW#@OIvQA@-uaA7-]oo5[$VtU{f3lX5v}Ja');
define('SECURE_AUTH_SALT', '2ErEU*1q0AUMY<LzFj% ||VJCX7OAN(_%q=!:e$4t=8B5~m+q(]pV/n03|om92(P');
define('LOGGED_IN_SALT',   'Wp%4N;k;)Z?#>lpPllO*LH)aM])XdA=9}wr2o+-Pc_5q r)?-yrmoP@4`Rl#<u-7');
define('NONCE_SALT',       'o}~R<3:ON>9C%VhhI/P(d -a3&tb6]|jn^/^-/DT3Sg9RWD59uP0)gK|s+;]7X-u');

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'pso_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
