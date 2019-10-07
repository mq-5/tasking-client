import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logout from '../components/LogOut';
import NewTodo from '../components/NewTodo';
import NewProject from '../components/NewProject';
import NewLabel from 'components/NewLabel';
import Todos from './Todos';
import EditLabel from 'components/EditLabel';
import EditProject from 'components/EditProject';
import Profile from '../pages/Profile'

import OverflowScrolling from 'react-overflow-scrolling';
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
import Routes from 'routes';

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
				<div className="navbar-translate">
					<NavbarBrand href="/">
						Tasking
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
				</div>
				<UncontrolledCollapse navbar toggler="#navbarTogglerDemo02">
					<Nav className="ml-auto mt-2 mt-lg-0" navbar>
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
								{/* <NavItem style={{ color: 'white', marginLeft: '1rem' }}>{props.user.name}</NavItem> */}
								<Link style={{ color: 'white', marginLeft: '1rem' }} to='/main/profile'>{props.user.name}</Link>
							</NavItem>
							<NewTodo {...props} className='btn-link my' />
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
		// console.log('FEETTTTTCCHHHH', data)
		this.setState({ data: data.data, loading: false })
	}

	render() {
		const { default_project, projects, labels } = { ...this.state.data }
		console.log('MAIN', this.state)
		if (this.state.loading) {
			return <div style={{ padding: '45vh 50vw' }}>
				<Spinner style={{ width: '3rem', height: '3rem' }} color='danger' />
			</div>
		} else {
			return (
				<>
					<NavBar {...this.props} {...this.state.data} fetch={this.fetchData} />
					<Row className="dashboard">
						<Col md={3} sm={4} className='sidebar'>
							<OverflowScrolling className='overflow-scrolling'>
								<NavLink className=''>
									<Link to={`/main/projects/${default_project.id}/`}>
										{default_project.name}
									</Link>
								</NavLink>
								<NavLink>
									<Link to="/main/today/">
										Today <small>{this.state.data.today.length}</small>
									</Link>
								</NavLink>
								<hr />
								<h5 className=' text-center'>My Projects</h5>
								{projects.my_projects.filter(p => p.id !== default_project.id).map(p => {
									return <NavLink>
										<Link to={`/main/projects/${p.id}/`}>
											{p.name} <small>{p.todos.length}</small>
											<EditProject {...this.props} fetch={this.fetchData} project={p} />
										</Link>
									</NavLink>
								})}
								<NavLink>
									<NewProject {...this.props} fetch={this.fetchData} />
								</NavLink>
								<hr />
								<h5 className=' text-center'>Shared with me</h5>
								{projects.shared.map(p => {
									return <>
										<NavLink>
											<Link to={`/main/projects/${p.id}/`}>
												{p.name} <small>{p.todos.length}</small>
											</Link>
										</NavLink> </>
								})}
								<hr />
								{/* <NavLink href='#' id="toggler"> */}
								<h5 className=' text-center' >
									<a id="label">	Labels <i class="nc-icon nc-minimal-down mx-2"></i></a>
								</h5>
								{/* </NavLink> */}
								<UncontrolledCollapse toggler="#label">
									{labels.map(l => {
										return <NavLink>
											<Link to={`/main/labels/${l.id}/`} style={{ color: l.color }} >
												{l.name} <i className="fa fa-tag" aria-hidden="true"></i>
												<EditLabel {...this.props} fetch={this.fetchData} label={l} />
											</Link>
										</NavLink>
									})}
									<NavLink>
										<NewLabel {...this.props} fetch={this.fetchData} />
									</NavLink>
								</UncontrolledCollapse>
								{/* <hr />
								<h5 className='text-center' >
									<a id="filter">	Filters <i class="nc-icon nc-minimal-down mx-2"></i></a>
								</h5>
								<UncontrolledCollapse toggler="#filter">
									<NavLink>
										<Link to='/main/completed'>
											Completed
										</Link>
									</NavLink>
									<NavLink>
										<Link onClick={e => console.log('hehe', e)}>
											Assigned to me
										</Link>
									</NavLink>
								</UncontrolledCollapse> */}
							</OverflowScrolling>
						</Col>
						<Col className='body' md={9} sm={8} xs={12} >
							<div className='px-5 py-3'>
								<Switch>
									<Route path='/main/' exact render={() => <h1 className='m-5'>Hello {this.state.data.user.name}... </h1>} />
									<Route path='/main/projects/:id/' render={(props) =>
										<Todos {...props} {...this.state} fetch={this.fetchData} />} >
									</Route>
									<Route path='/main/labels/:id/' render={(props) =>
										<Todos {...props} {...this.state} fetch={this.fetchData} />} >
									</Route>
									<Route path='/main/today/' render={(props) =>
										<Todos {...props} {...this.state} fetch={this.fetchData} />} >
									</Route>
									<Route path='/main/search/:key/' render={(props) =>
										<Todos {...props} {...this.state} fetch={this.fetchData} />} >
									</Route>
									<Route path="/main/profile" render={(props) => <Profile {...props} {...this.state} />} />
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