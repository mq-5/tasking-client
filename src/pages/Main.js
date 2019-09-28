import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logout from '../components/LogOut';
import NewTodo from '../components/NewTodo';
import NewProject from '../components/NewProject';
import NewLabel from 'components/NewLabel';
import Todos from './Todos';


import {
	UncontrolledCollapse,
	Button,
	FormGroup,
	Form,
	Input,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav, Row, Col, Spinner
} from "reactstrap";
import './styles/dashboard.css'

function NavBar(props) {
	const [bodyClick, setBodyClick] = useState(false);
	const [key, setKey] = useState()

	const searchKey = async () => {
		window.location.href = `/main/search/${key}`
	}
	return (
		<>
			{bodyClick ? (
				<div
					id="bodyClick"
					onClick={() => {
						document.documentElement.classList.toggle("nav-open");
						setBodyClick(false);
					}}
				/>
			) : null}
			<Navbar color="danger" expand="lg" className="sticky-top">
				<NavbarBrand href="/">
					Todo List
				</NavbarBrand>
				<button
					className="navbar-toggler"
					id="navbarTogglerDemo02"
					type="button"
					onClick={() => {
						document.documentElement.classList.toggle("nav-open");
						setBodyClick(true);
					}}
				>
					<span className="navbar-toggler-bar bar1" />
					<span className="navbar-toggler-bar bar2" />
					<span className="navbar-toggler-bar bar3" />
				</button>
				<UncontrolledCollapse navbar toggler="#navbarTogglerDemo02">
					<Nav className="mr-auto mt-2 mt-lg-0" navbar>
					</Nav>
					<Form className="form-inline ml-auto" style={{ listStyleType: "none" }} >
						<FormGroup className="has-white">
							<Form onSubmit={e => {
								e.preventDefault()
								searchKey()
							}}>
								<Input placeholder="Search tasks..." type="text" onChange={e => setKey(e.target.value)} />
							</Form>
							<NavItem>
								<NewTodo {...props} className='btn-link my' />
							</NavItem>
							<NavItem style={{ color: 'white' }}>{props.user.name}</NavItem>
							<NavItem >
								<Button
									className="btn-link my ml-2"
									onClick={() => logout(props.token, props.URL)}
								>
									Log Out
								</Button>
							</NavItem>
						</FormGroup>
					</Form>

				</UncontrolledCollapse>
			</Navbar>
		</>
	);
}


class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: null,
			loading: true,
			token: this.props.token,
			URL: this.props.URL
		}
	}

	componentDidMount = () => {
		this.fetchData()
	}

	fetchData = async () => {
		const resp = await fetch(`${this.props.URL}users/data`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Token ${this.props.token}`
			}
		})
		const data = await resp.json()
		console.log('FEETTTTTCCHHHH', data)
		this.setState({ data, loading: false })
	}

	render() {
		const { default_project, projects, labels } = { ...this.state.data }
		// console.log('MAIN', default_project, projects, this.state)
		if (this.state.loading) {
			return <div style={{ padding: '45vh 50vw' }}>
				<Spinner style={{ width: '3rem', height: '3rem' }} color='danger' />
			</div>
		} else {
			return (
				<>
					<NavBar {...this.props} {...this.state.data} fetch={this.fetchData} />
					<Row className="dashboard">
						<Col md={2} sm={3} className='sidebar' style={{ height: 'calc(100vh - 60px)' }}>
							<NavLink className=''>
								<Link to="/main/projects/inbox/">Inbox</Link>
							</NavLink>
							<NavLink>
								<Link to="/main/today/">Today</Link>
							</NavLink>
							<hr />
							<h5 className='text-white text-center'>Projects</h5>

							{projects.filter(p => p.id !== default_project.id).map(p => {
								return <>
									<NavLink>
										<Link to={`/main/projects/${p.name}/`}>{p.name}</Link>
									</NavLink> </>
							})}
							<NavLink>
								<NewProject {...this.props} fetch={this.fetchData} />
							</NavLink>
							<hr />
							<h5 className='text-white text-center'>Labels</h5>
							{labels.map(l => {
								return <NavLink>
									<Link to='#' style={{ color: l.color }} >
										{l.name} <i class="fa fa-bookmark" aria-hidden="true"></i>
									</Link>
								</NavLink>
							})}
							<NavLink>
								<NewLabel {...this.props} fetch={this.fetchData} />
							</NavLink>
						</Col>
						<Col className='body' md={10} sm={9} xs={12} >
							<div className='px-5 py-3'>
								<Switch>
									<Route path='/main/projects/:project/' render={(props) =>
										<Todos {...props} {...this.state} fetch={this.fetchData} />} >
									</Route>
									<Route path='/main/today/' render={(props) =>
										<Todos {...props} {...this.state} fetch={this.fetchData} />} >
									</Route>
									<Route path='/main/search/:key/' render={(props) =>
										<Todos {...props} {...this.state} fetch={this.fetchData} />} >
									</Route>
								</Switch>

							</div>
						</Col>
					</Row>
				</>
			)

		}
	}
}

export default Main;