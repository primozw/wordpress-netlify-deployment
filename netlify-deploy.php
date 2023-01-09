<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link    https://weingerl.com
 * @since   1.0.0
 * @package Netlify_Deploy
 *
 * @wordpress-plugin
 * Plugin Name:       Deploy to Netlify
 * Description:       Triggers builds and see deploys on Netlify
 * Version:           1.0.0
 * Author:            Primoz Weingerl
 * Author URI:        https://weingerl.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       netlify-deploy
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (! defined('WPINC') ) {
    die;
}

/**
 * Current plugin path.
 * Current plugin url.
 * Current plugin version.
 *
 * Rename these constants for your plugin
 * Update version as you release new versions.
 */

define('NETLIFY_DEPLOY_PATH', plugin_dir_path(__FILE__));
define('NETLIFY_DEPLOY_URL', plugin_dir_url(__FILE__));
define('NETLIFY_DEPLOY_VERSION', '1.0.0');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-netlify-deploy-activator.php
 */
function activate_netlify_deploy()
{
    include_once NETLIFY_DEPLOY_PATH . 'includes/class-netlify-deploy-activator.php';
    Netlify_Deploy_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-netlify-deploy-deactivator.php
 */
function deactivate_netlify_deploy()
{
    include_once NETLIFY_DEPLOY_PATH . 'includes/class-netlify-deploy-deactivator.php';
    Netlify_Deploy_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_netlify_deploy');
register_deactivation_hook(__FILE__, 'deactivate_netlify_deploy');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require NETLIFY_DEPLOY_PATH . 'includes/class-netlify-deploy.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since 1.0.0
 */
function run_netlify_deploy()
{

    $plugin = new Netlify_Deploy();
    $plugin->run();

}
run_netlify_deploy();
