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
import {
	Avatar,
	Button,
	Checkbox,
	createTheme,
	Dialog,
	DialogTitle, List, ListItem,
	ListItemAvatar,
	TextField,
	ThemeProvider
} from "@mui/material";
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import DoDisturbIcon from '@mui/icons-material/DoDisturb';

import uuid from 'react-uuid';
import dayjs from "dayjs";


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
  createData(uuid(), 'Frozen yoghurt', 159, '02/03/22', 'low', false),
  createData(uuid(), 'Ice cream sandwich', 237, '02/03/22', 'low', false),
  createData(uuid(), 'Eclair', 262, '02/03/22', 'low', false),
  createData(uuid(), 'Cupcake', 305, '02/03/22', 'low', false),
  createData(uuid(), 'Gingerbread', 356, '02/03/22', 'low', false),
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

function SimpleDialog(props) {
	const { onClose, onUpdate, open } = props;
	const [title, setTitle] = React.useState('');
	const [titleEmpty, setTitleEmpty] = React.useState(false);
	const [titleHelperText, setTitleHelperText] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [descriptionEmpty, setDescriptionEmpty] = React.useState(false);
	const [descriptionHelperText, setDescriptionHelperText] = React.useState('');
	const [selectedDate, setSelectedDate] = React.useState(dayjs());
	const [priority, setPriority] = React.useState('low');

	const handleTitleChange = (e) => {
		let value = e.target.value;
		setTitle(value);
		if (value.length === 0) {
			setTitleEmpty(true);
			setTitleHelperText('Title is Required!');
		} else {
			setTitleEmpty(false);
			setTitleHelperText(null);
		}
	};

	const handleDescriptionChange = (e) => {
		let value = e.target.value;
		setDescription(value);
		if (value.length === 0) {
			setDescriptionEmpty(true);
			setDescriptionHelperText('Description is Required!');
		} else {
			setDescriptionEmpty(false);
			setDescriptionHelperText(null);
		}
	};

	const handleDateChange = (newValue) => {
		console.log(newValue.format('MM/DD/YY'));
		setSelectedDate(newValue);
	}

	const handlePriorityChange = (e) => {
		setPriority(e.target.value);
	}

	const handleClose = () => {
		onClose();
	};

	const handleEdit = () => {
		if (title.length === 0) {
			setTitleEmpty(true);
			setTitleHelperText('Title is Required!');
		}
		if (description.length === 0) {
			setDescriptionEmpty(true);
			setDescriptionHelperText('Description is Required!');
		}
		if (title.length !== 0 && description.length !== 0) {
			onUpdate(createData(uuid(), title, description, selectedDate.format('MM/DD/YY'), priority, false));
			setSelectedDate(dayjs());
			setTitle('');
			setDescription('');
			setPriority('low');
			onClose();
		}
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<Toolbar sx={{backgroundColor: blue[800],
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'left',
				color:'white'}}>
				<AddCircleIcon></AddCircleIcon>
				<Typography variant="p" component="div" >
					Add Task
				</Typography>
			</Toolbar>
			<Container sx={{display: 'flex', flexDirection: 'column', padding: '32px 32px 18px 32px'}}>
				<TextField
					value={title}
					onChange={(e) => handleTitleChange(e)}
					error={titleEmpty}
					helperText={titleHelperText}
					id="outlined-basic" label="Title" variant="outlined" sx={{width: '280px', paddingBottom: '32px'}} />
				<TextField
					value={description}
					onChange={(e) => handleDescriptionChange(e)}
					error={descriptionEmpty}
					helperText={descriptionHelperText}
					id="outlined-basic" label="Description" variant="outlined" sx={{width: '280px', paddingBottom: '32px'}} />
				<LocalizationProvider dateAdapter={AdapterDayjs}  sx={{width: '280px', marginBottom: '24px'}} >
					<DatePicker
						label="Deadline"
						value={selectedDate}
						onChange={handleDateChange}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
				<FormControl  sx={{width: '280px', marginTop: '24px'}}>
					<FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
					<RadioGroup
						row
						aria-labelledby="demo-row-radio-buttons-group-label"
						name="row-radio-buttons-group"
						value={priority}
						onChange={handlePriorityChange}
					>
						<FormControlLabel value="low" control={<Radio />} label="Low" />
						<FormControlLabel value="med" control={<Radio />} label="Med" />
						<FormControlLabel value="high" control={<Radio />} label="High" />
					</RadioGroup>
				</FormControl>
			</Container>
			<Container  onClick={(e) => {handleEdit()}}
				sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '5px!important'}}>
				<Button variant="contained" size="large" startIcon={<AddCircleIcon />} color={'secondary'} sx={{width: '110px', margin: '5px'}}>
					ADD
				</Button>
				<Button  onClick={(e) => {handleClose()}}
					variant="contained" size="large" startIcon={<DoDisturbIcon />} color={'error'} sx={{width: '110px', margin: '5px'}}>
					CANCEL
				</Button>
			</Container>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	onUpdate: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};


export default function BackToTop(props) {
	const [open, setOpen] = React.useState(false);
	const [todoList, updateTodoList] = useImmer(
		rows
	);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function handleToggleTodo(id) {
		updateTodoList(draft => {
			const todo = draft.find(a =>
				a.id === id
			);
			todo.isComplete = !todo.isComplete;
		});
	};

	function handleDeleteTodo(id) {
		updateTodoList( (draft) => {
			const index = draft.findIndex(a =>
				a.id === id
			);
			draft.splice(index, 1);
		});
	};

	function handleAddTodo(newItem) {
		updateTodoList( (draft) => {
			draft.push(newItem);
		});
	};

	function CanUpdate(props) {
		const isComplete = props.isComplete;
		if (!isComplete) {
			return <Button variant="contained" size="large" startIcon={<EditIcon />} color={'secondary'} sx={{width: '130px'}}>
				UPDATE
			</Button>;
		}
	}

	return (
		<ThemeProvider theme={theme}>
		<React.Fragment>
			<SimpleDialog
				open={open}
				onClose={handleClose}
				onUpdate={handleAddTodo}
			/>
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
					<Button onClick={(e) => {handleClickOpen()}}
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
													  <CanUpdate isComplete={row.isComplete}></CanUpdate>
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
