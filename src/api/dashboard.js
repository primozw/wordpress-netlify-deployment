/*WordPress*/
import apiFetch from "@wordpress/api-fetch";

export const fetchDeploys = async () => {
    let path = 'netlify-deploy/v1/deploys'

    try {
        return await apiFetch({
            path: path,
            method : 'GET'
        });
    } catch (error) {
        console.log('Fetch Deploys Errors:', error);
        return false
    }
};

export const getSiteInfo = async () => {
  let path = 'netlify-deploy/v1/info'

  try {
      return await apiFetch({
          path: path,
          method : 'GET'
      });
  } catch (error) {
      console.log('Getting Info Errors:', error);
      return false
  }
};

export const triggerBuild = async () => {
  let path = 'netlify-deploy/v1/build'

  try {
      return await apiFetch({
          path: path,
          method : 'POST'
      });
  } catch (error) {
      console.log('Build Trigger Errors:', error);
      return false
  }
};
