<?php


/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Netlify_Deploy
 * @subpackage Netlify_Deploy/admin
 * @author     codersantosh <codersantosh@gmail.com>
 */
class Netlify_Deploy_Admin
{

    /**
     * The ID of this plugin.
     * Used on slug of plugin menu.
     * Used on Root Div ID for React too.
     *
     * @since  1.0.0
     * @access private
     * @var    string    $plugin_name    The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since  1.0.0
     * @access private
     * @var    string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @since 1.0.0
     * @param string $plugin_name The name of this plugin.
     * @param string $version     The version of this plugin.
     */
    public function __construct( $plugin_name, $version )
    {

        $this->plugin_name = $plugin_name;
        $this->version     = $version;

    }

    /**
     * Add Admin Page Menu page.
     */
    public function add_admin_menu()
    {
        // add as Settings subpage
        // you can change to add_menu_page if you wont separate menu item
        add_options_page(
            esc_html__('Deployment', 'netlify-deploy'),
            esc_html__('Deployment', 'netlify-deploy'),
            'manage_options',
            $this->plugin_name,
            array( $this, 'add_setting_root_div' )
        );
    }

    public function add_dashboard_widget()
    {
        wp_add_dashboard_widget(
            $this->plugin_name . '-widget', 
            'Netlify Deployment', 
            array( $this, 'add_widget_root_div' )
        );
    }

    /**
     * Add Root Div For React in settings page.
     */
    public function add_setting_root_div()
    {
        echo '<div id="' . $this->plugin_name . '-settings' . '"></div>';
    }

    /**
     * Add Root Div For React in dashboard.
     */
    public function add_widget_root_div()
    {
        echo '<article id="' . $this->plugin_name . '-widget-content' . '"></article>';
    }



    /**
     * Register the CSS/JavaScript Resources for the admin area.
     *
     * Use Condition to Load it Only When it is Necessary
     *
     * @since 1.0.0
     */
    public function enqueue_resources()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Netlify_Deploy_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Netlify_Deploy_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        $screen              = get_current_screen();
        $admin_scripts_bases = array( 'settings_page_' . $this->plugin_name ); // change to 'toplevel_page_' if using add_menu_page

        if (! ( isset($screen->base) && ( in_array($screen->base, $admin_scripts_bases) || $screen->base == 'dashboard' ) ) ) {
            return;
        }

        /*Scripts dependency files*/
        $deps_file = NETLIFY_DEPLOY_PATH . 'build/main.asset.php';

        /*Fallback dependency array*/
        $dependency = [];
        $version = $this->version;

        /*Set dependency and version*/
        if (file_exists($deps_file) ) {
            $deps_file       = include $deps_file;
            $dependency      = $deps_file['dependencies'];
            $version         = $deps_file['version'];
        }

        wp_enqueue_script($this->plugin_name, NETLIFY_DEPLOY_URL . 'build/main.js', $dependency, $version, true);
        wp_enqueue_style($this->plugin_name, NETLIFY_DEPLOY_URL . 'build/main.css', array('wp-components'), $version);

        $localize = array(
            'version' => $this->version,
            'root_id_settings' => $this->plugin_name . '-settings',
            'root_id_widget' => $this->plugin_name . '-widget-content'
        );
        wp_set_script_translations($this->plugin_name, $this->plugin_name);
        wp_localize_script($this->plugin_name, 'wpNetlifyDeploy', $localize);
    }


    /**
     * Register settings.
     * Common callback function of rest_api_init and admin_init
     * Schema: http://json-schema.org/draft-04/schema#
     *
     * Add your own settings fields here
     *
     * @since 1.0.0
     *
     * @param  null.
     * @return void
     */
    public function register_settings()
    {
        $defaults = netlify_deploy_default_options();
        register_setting(
            'netlify_deploy_settings_group',
            'netlify_deploy_options',
            array(
                'type'         => 'object',
                'default'      => $defaults,
                'show_in_rest' => array(
                    'schema' => array(
                        'type'       => 'object',
                        'properties' => array(
                            'netlify_site_id' => array(
                                'type' => 'string',
                                'default' => $defaults['netlify_site_id']
                            ),
                            'netlify_webhook' => array(
                                'type' => 'string',
                                'default' => $defaults['netlify_webhook']
                            ),
                            /*Settings -> Advanced*/
                            'netlify_token' => array(
                                'type' => 'string',
                                'default' => $defaults['netlify_token']
                            ),
                        ),
                    ),
                ),
            )
        );
    }


    public function register_rest_routes()
    {   
        // route for getting deploys
        register_rest_route(
            'netlify-deploy/v1', '/deploys', array(
            'methods'  => 'GET',
            'callback' => array( $this, 'add_route_deploys' ),
            )
        );

        // route for triggering build
        register_rest_route(
            'netlify-deploy/v1', '/build', array(
            'methods'  => 'POST',
            'callback' => array( $this, 'add_route_build' ),
            )
        );

        // route for getting site info
        register_rest_route(
            'netlify-deploy/v1', '/info', array(
            'methods'  => 'GET',
            'callback' => array( $this, 'add_route_info' ),
            )
        );
    }

    /**
     * Get last 5 deploys on the netlify
     *
     * @param  WP_REST_Request $request
     * @return JSON
     */ 
    public function add_route_deploys(WP_REST_Request $request)
    {
        // get data for connecting to netlify
        $settings = get_option('netlify_deploy_options');

        // Fatch data from Netlify
        $response = wp_remote_get(
            'https://api.netlify.com/api/v1/sites/' . $settings['netlify_site_id'] . '/deploys?per_page=5', 
            array( 
                'headers' => array( 'Authorization' => 'Bearer ' . trim($settings['netlify_token']) )
             )
        );
        return json_decode(wp_remote_retrieve_body($response));
    }

    /**
     * Trigger build process on
     *
     * @param  WP_REST_Request $request
     * @return response
     */
    public function add_route_build(WP_REST_Request $request)
    {
        // get data for connecting to netlify
        $settings = get_option('netlify_deploy_options');

        // Fatch data from Netlify
        $response = wp_remote_post($settings['netlify_webhook']);
        return $response;
    }

    public function add_route_info(WP_REST_Request $request)
    {
        // get data for connecting to netlify
        $settings = get_option('netlify_deploy_options');

        // Fatch data from Netlify
        $response = wp_remote_get(
            'https://api.netlify.com/api/v1/sites/' . $settings['netlify_site_id'], 
            array( 
                'headers' => array( 'Authorization' => 'Bearer ' . trim($settings['netlify_token']) )
             )
        );
        return json_decode(wp_remote_retrieve_body($response));
    }
}
