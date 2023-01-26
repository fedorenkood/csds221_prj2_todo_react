import "./styles.css";
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import {Button, Checkbox} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function ScrollTop(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			'#back-to-top-anchor',
		);

		if (anchor) {
			anchor.scrollIntoView({
				block: 'center',
			});
		}
	};

	return (
		<Fade in={trigger}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
			>
				{children}
			</Box>
		</Fade>
	);
}

ScrollTop.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default function BackToTop(props) {
	const [checked, setChecked] = React.useState(true);

	const handleChange = (event, item) => {
		setChecked(event.target.checked);
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						News
				  	</Typography>
					<Button variant="contained" size="large" startIcon={<AddIcon />}>
					  	Large
					</Button>
				</Toolbar>
			</AppBar>
			<Toolbar id="back-to-top-anchor" />
			<Container>
				 <TableContainer component={Paper}>
					  <Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								  <TableRow>
										<TableCell>Task</TableCell>
										<TableCell align="right">Description</TableCell>
										<TableCell align="right">Deadline</TableCell>
										<TableCell align="right">Priority</TableCell>
										<TableCell align="right">Is Complete</TableCell>
										<TableCell align="right">Action</TableCell>
								  </TableRow>
							</TableHead>
							<TableBody>
								  {rows.map((row) => (
										<TableRow
										  key={row.name}
										  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											  <TableCell component="th" scope="row">
												{row.name}
											  </TableCell>
											  <TableCell align="right">{row.calories}</TableCell>
											  <TableCell align="right">{row.fat}</TableCell>
											  <TableCell align="right">{row.carbs}</TableCell>
											  <TableCell align="right">
												  <Checkbox
													  checked={checked}
													  onChange={(e) => {handleChange(e, 1)}}
													  inputProps={{ 'aria-label': 'controlled' }}
												  />
											  </TableCell>
											  <TableCell align="right">{row.protein}</TableCell>
										</TableRow>
								  ))}
							</TableBody>
					  </Table>
				</TableContainer>
			</Container>
			<ScrollTop {...props}>
				<Fab size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</React.Fragment>
	);
}
