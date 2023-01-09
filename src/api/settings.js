/*WordPress*/
import apiFetch from "@wordpress/api-fetch";
import {addQueryArgs} from "@wordpress/url";

export const fetchSettings = async () => {
    let path = 'wp/v2/settings',
        options ={};

    try {
        options = await apiFetch({
            path: path,
            method : 'GET'
        });
    } catch (error) {
        console.log('fetchSettings Errors:', error);
        return {
            netlify_deploy_options_fetch_settings_errors : true
        }
    }
    if( options.netlify_deploy_options){
        return options.netlify_deploy_options;
    }
    console.log(options)
    return options;
};

export const updateSettings = async (data) => {
    let path = 'wp/v2/settings',
        options ={};

    let queryArgs = {
        netlify_deploy_options : data
    }

    path = addQueryArgs(path, queryArgs);

    try {
        options = await apiFetch({
            path: path,
            method : 'POST'
        });
    } catch (error) {
        console.log('updateSettings Errors:', error);
        return {
            netlify_deploy_options_update_settings_errors : true
        }
    }
    if( options.netlify_deploy_options){
        return options.netlify_deploy_options;
    }
    return options;
};