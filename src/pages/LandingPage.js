
import React from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'

// reactstrap components
import {
	Button, CardBody, CardTitle,
	Form, CardFooter,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row, Card,
	Col, CarouselItem, Carousel, CarouselIndicators, CarouselCaption
} from "reactstrap";


const items = [
	{
		src: require("assets/img/soroush-karimi.jpg"),
		altText: "Somewhere",
		caption: "Somewhere"
	},
	{
		src: require("assets/img/federico-beccari.jpg"),
		altText: "Somewhere else",
		caption: "Somewhere else"
	},
	{
		src: require("assets/img/joshua-stannard.jpg"),
		altText: "Here it is",
		caption: "Here it is"
	}
];

function SectionCarousel() {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const [animating, setAnimating] = React.useState(false);
	const onExiting = () => {
		setAnimating(true);
	};
	const onExited = () => {
		setAnimating(false);
	};
	const next = () => {
		if (animating) return;
		const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};
	const previous = () => {
		if (animating) return;
		const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	};
	const goToIndex = newIndex => {
		if (animating) return;
		setActiveIndex(newIndex);
	};
	return (
		<>
			<div className="section pt-o" id="carousel">
				<Container>
					<Row>
						<Col className="ml-auto mr-auto" md="8">
							<Card className="page-carousel">
								<Carousel
									activeIndex={activeIndex}
									next={next}
									previous={previous}
								>
									<CarouselIndicators
										items={items}
										activeIndex={activeIndex}
										onClickHandler={goToIndex}
									/>
									{items.map(item => {
										return (
											<CarouselItem
												onExiting={onExiting}
												onExited={onExited}
												key={item.src}
											>
												<img src={item.src} alt={item.altText} />
												<CarouselCaption
													captionText={item.caption}
													captionHeader=""
												/>
											</CarouselItem>
										);
									})}
									<a
										className="left carousel-control carousel-control-prev"
										data-slide="prev"
										href="#pablo"
										onClick={e => {
											e.preventDefault();
											previous();
										}}
										role="button"
									>
										<span className="fa fa-angle-left" />
										<span className="sr-only">Previous</span>
									</a>
									<a
										className="right carousel-control carousel-control-next"
										data-slide="next"
										href="#pablo"
										onClick={e => {
											e.preventDefault();
											next();
										}}
										role="button"
									>
										<span className="fa fa-angle-right" />
										<span className="sr-only">Next</span>
									</a>
								</Carousel>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>{" "}
		</>
	);
}


function LandingPage(props) {
	document.documentElement.classList.remove("nav-open");
	React.useEffect(() => {
		document.body.classList.add("profile-page");
		return function cleanup() {
			document.body.classList.remove("profile-page");
		};
	});

	return (
		<>
			<NavBar token={props.token} URL={props.URL} />
			<Header />

			<div className="section text-center">
				<Container>
					<Row>
						<Col className="ml-auto mr-auto" md="8">
							<h2 className="title">About Tasking</h2>
							<h5 className="description">
								Be organized and in peace
							</h5>
						</Col>
					</Row>
					<br />
					<br />
					<Row>
						<Col md="4">
							<div className="info">
								<div className="icon icon-info">
									<i className="nc-icon nc-tile-56" />
								</div>
								<div className="description">
									<h4 className="info-title">Organized</h4>
									<p className="description">
										Organize tasks with projects and priorities
									</p>
									<Button className="btn-link" color="info" href="/main">
										See more
									</Button>
								</div>
							</div>
						</Col>
						<Col md="4">
							<div className="info">
								<div className="icon icon-info">
									<i aria-hidden="true" className="nc-icon nc-tag-content" />
								</div>
								<div className="description">
									<h4 className="info-title">Stay focused</h4>
									<p>
										Add labels to tasks
                    </p>
									<Button className="btn-link" color="info" href="/main">
										See more
                    </Button>
								</div>
							</div>
						</Col>
						<Col md="4">
							<div className="info">
								<div className="icon icon-info">
									<i className="fa fa-users" />
								</div>
								<div className="description">
									<h4 className="info-title">Collaborate</h4>
									<p>
										Share with your team and assign tasks
                    </p>
									<Button className="btn-link" color="info" href="/main">
										See more
                    </Button>
								</div>
							</div>
						</Col>

					</Row>
				</Container>
			</div>
			{/* <SectionCarousel />
			<div className="section section-dark text-center">
				<Container>
					<h2 className="title">Let's talk about us</h2>
					<Row>
						<Col md="4">
							<Card className="card-profile card-plain">
								<div className="card-avatar">
									<a href="#pablo" onClick={e => e.preventDefault()}>
										<img
											alt="..."
											src={require("assets/img/faces/clem-onojeghuo-3.jpg")}
										/>
									</a>
								</div>
								<CardBody>
									<a href="#pablo" onClick={e => e.preventDefault()}>
										<div className="author">
											<CardTitle tag="h4">Henry Ford</CardTitle>
											<h6 className="card-category">Product Manager</h6>
										</div>
									</a>
									<p className="card-description text-center">
										Teamwork is so important that it is virtually impossible
										for you to reach the heights of your capabilities or make
										the money that you want without becoming very good at it.
                    </p>
								</CardBody>
								<CardFooter className="text-center">
									<Button
										className="btn-just-icon btn-neutral"
										color="link"
										href="#pablo"
										onClick={e => e.preventDefault()}
									>
										<i className="fa fa-twitter" />
									</Button>
									<Button
										className="btn-just-icon btn-neutral ml-1"
										color="link"
										href="#pablo"
										onClick={e => e.preventDefault()}
									>
										<i className="fa fa-google-plus" />
									</Button>
									<Button
										className="btn-just-icon btn-neutral ml-1"
										color="link"
										href="#pablo"
										onClick={e => e.preventDefault()}
									>
										<i className="fa fa-linkedin" />
									</Button>
								</CardFooter>
							</Card>
						</Col>
						<Col md="4">
							<Card className="card-profile card-plain">
								<div className="card-avatar">
									<a href="#pablo" onClick={e => e.preventDefault()}>
										<img
											alt="..."
											src={require("assets/img/faces/joe-gardner-2.jpg")}
										/>
									</a>
								</div>
								<CardBody>
									<a href="#pablo" onClick={e => e.preventDefault()}>
										<div className="author">
											<CardTitle tag="h4">Sophie West</CardTitle>
											<h6 className="card-category">Designer</h6>
										</div>
									</a>
									<p className="card-description text-center">
										A group becomes a team when each member is sure enough of
										himself and his contribution to praise the skill of the
										others. No one can whistle a symphony. It takes an
										orchestra to play it.
                    </p>
								</CardBody>
								<CardFooter className="text-center">
									<Button
										className="btn-just-icon btn-neutral"
										color="link"
										href="#pablo"
										onClick={e => e.preventDefault()}
									>
										<i className="fa fa-twitter" />
									</Button>
									<Button
										className="btn-just-icon btn-neutral ml-1"
										color="link"
										href="#pablo"
										onClick={e => e.preventDefault()}
									>
										<i className="fa fa-google-plus" />
									</Button>
									<Button
										className="btn-just-icon btn-neutral ml-1"
										color="link"
										href="#pablo"
										onClick={e => e.preventDefault()}
									>
										<i className="fa fa-linkedin" />
									</Button>
								</CardFooter>
							</Card>
						</Col>
						<Col md="4">
							<Card className="card-profile card-plain">
								<div className="card-avatar">
									<a href="#pablo" onClick={e => e.preventDefault()}>
										<img
											alt="..."
											src={require("assets/img/faces/erik-lucatero-2.jpg")}
										/>
									</a>
								</div>
								<CardBody>
									<a href="#pablo" onClick={e => e.preventDefault()}>
										<div className="author">
											<CardTitle tag="h4">Robert Orben</CardTitle>
											<h6 className="card-category">Developer</h6>
										</div>
									</a>
									<p className="card-description text-center">
										The strength of the team is each individual member. The
										strength of each member is the team. If you can laugh
										together, you can work together, silence isn’t golden,
										it’s deadly.
                    </p>
								</CardBody>
								<CardFooter className="text-center">
									<Button
										className="btn-just-icon btn-neutral"
										color="link"
										href="#pablo"
										onClick={e => e.preventDefault()}
									>
										<i className="fa fa-twitter" />
									</Button>
									<Button
										className="btn-just-icon btn-neutral ml-1"
										color="link"
										href="#pablo"
										onClick={e => e.preventDefault()}
									>
										<i className="fa fa-google-plus" />
									</Button>
									<Button
										className="btn-just-icon btn-neutral ml-1"
										color="link"
										href="#pablo"
										onClick={e => e.preventDefault()}
									>
										<i className="fa fa-linkedin" />
									</Button>
								</CardFooter>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			<div className="section landing-section">
				<Container>
					<Row>
						<Col className="ml-auto mr-auto" md="8">
							<h2 className="text-center">Keep in touch?</h2>
							<Form className="contact-form">
								<Row>
									<Col md="6">
										<label>Name</label>
										<InputGroup>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="nc-icon nc-single-02" />
												</InputGroupText>
											</InputGroupAddon>
											<Input placeholder="Name" type="text" />
										</InputGroup>
									</Col>
									<Col md="6">
										<label>Email</label>
										<InputGroup>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="nc-icon nc-email-85" />
												</InputGroupText>
											</InputGroupAddon>
											<Input placeholder="Email" type="text" />
										</InputGroup>
									</Col>
								</Row>
								<label>Message</label>
								<Input
									placeholder="Tell us your thoughts and feelings..."
									type="textarea"
									rows="4"
								/>
								<Row>
									<Col className="ml-auto mr-auto" md="4">
										<Button className="btn-fill" color="danger" size="lg">
											Send Message
                      </Button>
									</Col>
								</Row>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
			 */}
			<div>
				<Footer />
			</div>
		</>
	)
}
export default LandingPage;
