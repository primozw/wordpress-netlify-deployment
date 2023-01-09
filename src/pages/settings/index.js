/*WordPress*/
import {
    render,
    useContext,
} from '@wordpress/element';

import {__} from "@wordpress/i18n";

import {
    Spinner,
} from "@wordpress/components";

/*Inbuilt Context Provider*/
import SettingsContextProvider, {SettingsContext} from '../../context/SettingsContext';

// Components
import SettingsNotice from "../../components/notice";
import Cradidentials from "./Cradidentials";

const Settings = () => {
    const { useSettings, useIsPending, useNotice, useUpdateStateSettings } = useContext(SettingsContext);
  
    if (!Object.keys(useSettings).length) {
        return (
            <Spinner className="netlify-deploy-page-loader" />
        )
    }
    return  (
        <div className='netlify-deploy wrap'>
            {useNotice && !useIsPending && <SettingsNotice />}
            
            <h1>{__('Deployment Settings', 'netlify-deploy')}</h1>
            <Cradidentials />
            
        </div>
    )
}



const SettingsWrapper = () => {
    return  (
        <SettingsContextProvider>
            <Settings />
        </SettingsContextProvider>
    )
}

document.addEventListener('DOMContentLoaded', () => {
    if ('undefined' !== typeof document.getElementById(wpNetlifyDeploy.root_id_settings) && null !== document.getElementById(wpNetlifyDeploy.root_id_settings)) {
        render(<SettingsWrapper />, document.getElementById(wpNetlifyDeploy.root_id_settings));
    }
});