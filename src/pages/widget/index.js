// WordPress
import {
    render,
    useEffect,
    useState,
    useRef
} from '@wordpress/element';
import {__} from "@wordpress/i18n";

// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled, Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import Lottie from "lottie-react";
import rocketAnimation from './../../animations/rocket-animation.json';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

// Components
import DeployList from './DeployList';

// API
import { fetchDeploys, triggerBuild, getSiteInfo } from '../../api/dashboard';

const theme = createTheme({
    palette: {
        primary: {
            main: '#054861',
          },
          secondary: {
            main: '#5cebdf',
          },
          warning: {
            main: '#ffeb3b',
          },
          success: {
            main: '#5cebdf',
          },
          error: {
            main: '#f34c5b',
          },
          info: {
            main: '#40a6fb',
          },
    }
});

const Section = styled(Box)(
    ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`)

const BuildButton = styled(LoadingButton)(
    ({ theme }) => `
        min-width: 250px;
        background-color: #032B3A;
        color: #fff;
        box-shadow: none;
        &:hover {
            background-color: #032B3A;
            color: #fff;
            box-shadow: none;
        }
`)

// Components

const Widget = () => {

    const [site, setSite] = useState(null)
    const [deploys, setDeploys] = useState([])
    const [loadingDeploys, setLoadingDeploys] = useState(false)
    const [building, setBuilding] = useState(false)

    const lottieRef = useRef()
    const timer = useRef()

    const onStopBuilding = () => {
        setBuilding(false)
        lottieRef.current.pause()
        clearInterval(timer.current)
    }

    const onStartBuilding = () => {
        setBuilding(true)
        lottieRef.current.play()

        // Set every 30s if its still building
        clearInterval(timer.current)
        timer.current = setInterval(() => getDeploys(), 1000 * 15)
    }

    const getDeploys = async (progress = false) => {
        progress && setLoadingDeploys(true)
        try {
            const deploys = await fetchDeploys()
            setDeploys(deploys)
            progress && setLoadingDeploys(false)

            if (deploys && deploys.length !== 0 && ( deploys[0].state === 'error' ||  deploys[0].state === 'ready'  )) {
                onStopBuilding()
            } else {
                onStartBuilding()
            }
            
        } catch (error) {
            progress && setLoadingDeploys(false)
            return false
        }
    }

    const handleBuildTrigger = async () => {
        try {
            const build = await triggerBuild()
            if (build && build.response.message === 'OK') {
                onStartBuilding()
            }
        } catch (error) {
            console.log(' Error Triggering Build:', error);
        }
    }

    const init = async () => {
        try {
            const info = await getSiteInfo()

            if (info.site_id) {
                setSite({
                    status: 'ok',
                    id: info.site_id,
                    url: info.ssl_url,
                })
                getDeploys(true)
             } else {
                setSite({
                    status: 'error',
                    msg: 'Can not connect with Netlify. Check plugin settings.'
                })
             }

        } catch (error) {
            setSite({
                status: 'error',
                msg: 'Can not connect with Netlify. Check plugin settings.'
            })
        }
        lottieRef.current && lottieRef.current.pause();
    }

    useEffect(() => init(), [])

    return  (
        <div className='netlify-deploy-widget'>
            
            {!site ? <CircularProgress sx = { (theme) => ({
                display: 'block',
                m: `${theme.spacing(6)} auto`,
            })} /> :

            site.status === 'ok' ? <>
                <Section
                    sx = { (theme) => ({
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    })}
                >
                    <Box sx = { (theme) => ({
                        width: '50%',
                        minWidth: '300px'
                    })}>
                        <Lottie animationData={rocketAnimation} loop={true} lottieRef={lottieRef} />
                    </Box>
                    <Box sx = { (theme) => ({
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: theme.spacing(2)
                    })}>
                        <BuildButton 
                            loading={building}
                            loadingIndicator="Building ..." 
                            variant="contained"
                            size="large"
                            onClick={() => handleBuildTrigger()}
                        >
                            Build and Deploy
                        </BuildButton>
                        <Link href={site.url} target="_blank">
                            Visit site
                        </Link>
                    </Box>
                    
                    
                </Section>
                
                {loadingDeploys ? <CircularProgress sx = { (theme) => ({
                    display: 'block',
                    m: `${theme.spacing(6)} auto`,
                })} /> :

                    <Section>
                        <h2><strong>{__('Last Deploys', 'netlify-deploy')}</strong></h2>
                        { deploys.length === 0 ? 'No deploys jet.' : <DeployList deploys={deploys} /> }
                    </Section>
                }
            </> : <Alert severity="error">{site.msg}</Alert>
            }
            
        </div>
    )
}

const WidgetWrapper = () => (
    <ThemeProvider theme={theme}>
      <Widget />
    </ThemeProvider>
)


document.addEventListener('DOMContentLoaded', () => {
    if ('undefined' !== typeof document.getElementById(wpNetlifyDeploy.root_id_widget) && null !== document.getElementById(wpNetlifyDeploy.root_id_widget)) {
        render(<WidgetWrapper />, document.getElementById(wpNetlifyDeploy.root_id_widget));
    }
});