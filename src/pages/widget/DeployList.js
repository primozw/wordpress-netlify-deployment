// Wordpress
import { dateI18n } from "@wordpress/date";


// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton';

const padTo2Digits = (num) => num.toString().padStart(2, '0')

const getTime = totalSeconds => {

    if (!totalSeconds) return '';

    // get number of full minutes
    const minutes = Math.floor(totalSeconds / 60);

    // get remainder of seconds
    const seconds = totalSeconds % 60;

    // format as MM:SS
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

const State = ({data}) => {
  switch (data) {
    case "ready":
      return <Chip sx={{minWidth: '80px'}} variant="filled" label="success" color="secondary" />
    case "building":
      return <Chip sx={{minWidth: '80px'}} variant="filled" label="building" color="primary" />
    case "error":
      return <Chip sx={{minWidth: '80px'}} variant="filled" label="error" color="error" />
    default:
      return <Chip sx={{minWidth: '80px'}} variant="filled" label={data} color="primary" />
  }
}

export default function DeployList({deploys}) {
  console.log(deploys)

    return (
      <Table size="small" aria-label="Netlify Deploys">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="center">Building Time</TableCell>
            <TableCell align="center">Preview</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deploys.map((deploy) => (
            <TableRow
              key={deploy.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <State data={deploy.state} />
              </TableCell>
              <TableCell>{dateI18n("M j, Y, G:i", deploy.created_at)}</TableCell>
              <TableCell align="center">{getTime( deploy.deploy_time )}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="link" href={deploy.deploy_ssl_url} target="_blank">
                  <OpenInNewIcon />
                </IconButton>
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
};
