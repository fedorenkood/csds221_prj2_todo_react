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
import {Button, Checkbox, createTheme, ThemeProvider} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import {blue, red} from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useImmer } from 'use-immer';

import uuid from 'react-uuid';


const theme = createTheme({
	palette: {
		primary: {
			main: blue[800]
		},
		secondary: {
			main: blue[700]
		},
		error: {
			main: red[500]
		}
	},
});




function createData(id, title, description, deadline, priority, isComplete) {
  return { id, title, description, deadline, priority, isComplete };
}

let rows = [
  createData(uuid(), 'Frozen yoghurt', 159, 6.0, 24, false),
  createData(uuid(), 'Ice cream sandwich', 237, 9.0, 37, false),
  createData(uuid(), 'Eclair', 262, 16.0, 24, false),
  createData(uuid(), 'Cupcake', 305, 3.7, 67, false),
  createData(uuid(), 'Gingerbread', 356, 16.0, 49, false),
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
	const [todoList, updateTodoList] = useImmer(
		rows
	);

	function handleToggleTodo(id) {
		updateTodoList(draft => {
			const todo = draft.find(a =>
				a.id === id
			);
			todo.isComplete = !todo.isComplete;
		});
	}

	function handleDeleteTodo(id) {
		updateTodoList( (draft) => {
			const index = draft.findIndex(a =>
				a.id === id
			);
			draft.splice(index, 1);
		});
	}

	function handleAddTodo(id) {
		updateTodoList( (draft) => {
			draft.push(createData(uuid(), 'Frozen yoghurt', 159, 6.0, 24, false));
		});
	}

	return (
		<ThemeProvider theme={theme}>
		<React.Fragment>
			<CssBaseline />
			<AppBar>
				<Toolbar>
					<Container sx={{    display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'}}>
						<MenuIcon></MenuIcon>
						<Typography variant="p" component="div" >
							FRAMEWORKS
						</Typography>
					</Container>
					<Button onClick={(e) => {handleAddTodo(1234)}}
						variant="contained" size="large" startIcon={<AddCircleIcon />} color={'secondary'}>
					  	ADD
					</Button>
				</Toolbar>
			</AppBar>
			<Toolbar id="back-to-top-anchor" />
			<Container>
				 <TableContainer component={Paper}>
					  <Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								  <TableRow>
										<TableCell align="center">Title</TableCell>
										<TableCell align="center">Description</TableCell>
										<TableCell align="center">Deadline</TableCell>
										<TableCell align="center">Priority</TableCell>
										<TableCell align="center">Is Complete</TableCell>
										<TableCell align="center">Action</TableCell>
								  </TableRow>
							</TableHead>
							<TableBody>
								  {todoList.map((row) => (
										<TableRow
										  key={row.id}
										  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											  <TableCell align="center" component="th" scope="row">
												{row.title}
											  </TableCell>
											  <TableCell align="center">{row.description}</TableCell>
											  <TableCell align="center">{row.deadline}</TableCell>
											  <TableCell align="center">{row.priority}</TableCell>
											  <TableCell align="center">
												  <Checkbox
													  checked={row.isComplete}
													  onChange={(e) => {handleToggleTodo(row.id)}}
													  inputProps={{ 'aria-label': 'controlled' }}
												  />
											  </TableCell>
											  <TableCell align="center" >
												  <Container sx={{display: 'flex',
													  flexDirection: 'column',
													  alignItems: 'center',
													  justifyContent: 'center'}}>
													  <Button variant="contained" size="large" startIcon={<EditIcon />} color={'secondary'} sx={{width: '130px'}}>
														  UPDATE
													  </Button>
													  <Button onClick={(e) => {handleDeleteTodo(row.id)}}
														  variant="contained" size="large" startIcon={<CancelIcon />} color={'error'} sx={{width: '130px'}}
													  >
														  DELETE
													  </Button>

												  </Container>
											  </TableCell>
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
		</ThemeProvider>
	);
}
