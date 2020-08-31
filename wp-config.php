<?php
define( 'WP_CACHE', true ) ;
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u455017715_qHmSy' );
/** MySQL database username */
define( 'DB_USER', 'u455017715_bt4dJ' );
/** MySQL database password */
define( 'DB_PASSWORD', 'Charlie61647386' );
/** MySQL hostname */
define( 'DB_HOST', 'mysql' );
/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );
/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );
/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '4L8ADLi>|gpXvbZL{~)VkD+ere=C:/4(,h]Mt_/3_?D8O$:Ts<9MY?LlnY-^3GW]' );
define( 'SECURE_AUTH_KEY',   '/P,.UT6mjty*`L*//g~!1QIx8x]i4uDA8PZB&IWW0dns5y<Q8>eDT;y=L~+DH0yi' );
define( 'LOGGED_IN_KEY',     'uADeqi6(zwbJSSHe>h_*#1z[&l-k}W=UdFXF#$@obxpYg`g(nIK]--fPGBlou-C]' );
define( 'NONCE_KEY',         '+L{CyK@41aiE@:q:Y9[7|Z7I1~$4lNI;}:C(]` eXF5u`yjE8r$V|R^WUaZ/yT(k' );
define( 'AUTH_SALT',         'X3-}}kX)ILcX A -,{bDKdHQ4`A}I3yY;N;o]|NMP@w}8?9q/;fg82d{l]5:U_}d' );
define( 'SECURE_AUTH_SALT',  'ZfVV{GFsV@W^qRIZc;|YvF3n3EfA3oi2t~ED#JD^vG~iFu7$zd<}u-Deq=wJeQ*x' );
define( 'LOGGED_IN_SALT',    'LtL-+y.iZV#j`wnqW=T-srm/z6sh,wWOh^|AZ[ZAX=JkMr*0hnNhpW>/tZ&1klv/' );
define( 'NONCE_SALT',        '(XL,!o$H0l v>-/;B-@%z=t7Q[|Cc. |6wP.:S[ufx:zQD) slp`Fm3HJ;1uNnap' );
define( 'WP_CACHE_KEY_SALT', 'DSRC;S=SskWSr9eWTc4cxh_2;TA}}O+adUJZ|_=62_ybv)BN&1<)UCwWiHU&3aj@' );
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';
/* That's all, stop editing! Happy publishing. */
/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}
/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
