<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://weingerl.com
 * @since      1.0.0
 *
 * @package    Netlify_Deploy
 * @subpackage Netlify_Deploy/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Netlify_Deploy
 * @subpackage Netlify_Deploy/includes
 * @author     codersantosh <codersantosh@gmail.com>
 */
class Netlify_Deploy_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'netlify-deploy',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}
}
