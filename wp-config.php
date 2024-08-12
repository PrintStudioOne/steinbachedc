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
define( 'DB_NAME', 'steinbachedc_pso' );

/** Database username */
define( 'DB_USER', 'steinbachedc_pso' );

/** Database password */
define( 'DB_PASSWORD', 'h@@iUHHLnsDQ4L' );

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
define('AUTH_KEY',         ';-fE{TLzuun[X+9^i0)g3K<LSfaS&6DeJF-$dsA!372)qhxCn oyhK@9avAh9H4n');
define('SECURE_AUTH_KEY',  'N@ewe<S-PqacwU.fBzJFVM=1-Zz|r kOrTu0Yu]-cAU?ES6$od`iX^<TYjhTvi>h');
define('LOGGED_IN_KEY',    'Bnxt=ygqp9vAjs 5fyv#q+)icR6t/<_$^?v{)}?ebp+fwyde,MD7$YcH( }LGqN!');
define('NONCE_KEY',        '$RI?aL6U {j-Z$M|;SXnoEZPxNTQ8m5r$OzT1|ZNN#4@,OM7n>P-EZ9XC;?ZC$d|');
define('AUTH_SALT',        'uRxqKKGJG44rW(ygW(>]0]-8 aay]=~L`}V(^k!%BD_Ub=|TK>XoR]wz[-MFl!/m');
define('SECURE_AUTH_SALT', '-Y425o@*Kl)4yLV79Hu#)M#2xRqwL_mM_*e}16?J%-y?+qHv2jl>7cdav&&~s Y!');
define('LOGGED_IN_SALT',   '^<QX;:f;?4h2b~]h_Y sA@BW.D!dD5m*F[+.0&ra0l]Nlyh{>~nYpA$?2_-$:w(a');
define('NONCE_SALT',       'O{>4-h15f;:TI~~c|L^BjBArN8xF)[hr&Xx0{UuquW<>]:Zr/j4!bvN~J|Yi|u&t');

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
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */

define('DISALLOW_FILE_EDIT', true);

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
