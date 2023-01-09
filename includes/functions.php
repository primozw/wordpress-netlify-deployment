<?php
/**
 * Get the Plugin Default Options.
 *
 * @since 1.0.0
 *
 * @param null
 *
 * @return array Default Options
 *
 * @author codersantosh <codersantosh@gmail.com>
 */
if (! function_exists('netlify_deploy_default_options') ) :
    function netlify_deploy_default_options()
    {
        $default_theme_options = array(
        'netlify_site_id' => esc_html__('', 'netlify-deploy'),
        'netlify_webhook' => esc_html__('', 'netlify-deploy'),
        'netlify_token' => esc_html__('', 'netlify-deploy'),
        );

        return apply_filters('netlify_deploy_default_options', $default_theme_options);
    }
endif;

/**
 * Get the Plugin Saved Options.
 *
 * @since 1.0.0
 *
 * @param string $key optional option key
 *
 * @return mixed All Options Array Or Options Value
 *
 * @author codersantosh <codersantosh@gmail.com>
 */
if (! function_exists('netlify_deploy_get_options') ) :
    function netlify_deploy_get_options( $key = '' )
    {
        $options         = get_option('netlify_deploy_options');
        $default_options = netlify_deploy_default_options();

        if (! empty($key) ) {
            if (isset($options[ $key ]) ) {
                return $options[ $key ];
            }
            return isset($default_options[ $key ]) ? $default_options[ $key ] : false;
        } else {
            if (! is_array($options) ) {
                $options = array();
            }
            return array_merge($default_options, $options);
        }
    }
endif;
