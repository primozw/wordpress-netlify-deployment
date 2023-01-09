/*WordPress*/
import {
    useContext,
} from '@wordpress/element';

import {__} from "@wordpress/i18n";

import {
    TextControl
} from "@wordpress/components";

/*Inbuilt Context Provider*/
import {SettingsContext} from '../../context/SettingsContext';

// Components
import SaveBtn from "../../components/save-btn";


export default function Cradidentials(params) {
  
  const { useSettings, useUpdateStateSettings } = useContext(SettingsContext);
  
  return  (
        <>        
         <TextControl
              label={__('Netlify Site ID','netlify-deploy')}
              placeholder={__('Enter Netlify Site ID','netlify-deploy')}
              value={useSettings && useSettings['netlify_site_id']}
              onChange={newVal =>
                  useUpdateStateSettings('netlify_site_id',newVal)
              }
          />
          <TextControl
              label={__('Netlify Webhook','netlify-deploy')}
              placeholder={__('Enter Webhook URL','netlify-deploy')}
              value={useSettings && useSettings['netlify_webhook']}
              onChange={newVal =>
                  useUpdateStateSettings('netlify_webhook',newVal)
              }
          />
          <TextControl
              label={__('Netlify API Token','netlify-deploy')}
              placeholder={__('Enter API Token','netlify-deploy')}
              value={useSettings && useSettings['netlify_token']}
              onChange={newVal =>
                  useUpdateStateSettings('netlify_token',newVal)
              }
          />
          <SaveBtn />
      </> 
  )
};