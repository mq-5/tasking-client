import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function LandingPageHeader() {
    let pageHeader = React.createRef();

    React.useEffect(() => {
        if (window.innerWidth < 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                pageHeader.current.style.transform =
                    "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    });

    return (
        <>
            <div
                style={{
                    backgroundImage: "url(" + require('../pages/styles/cell-phone-close-up-contemporary-905873.jpg') + ")"
                }}
                className="page-header"
                data-parallax={true}
                ref={pageHeader}
            >
                <div className="filter" />
                <Container>
                    <div className="motto text-center">
                        <h1>Get things done</h1>
                        <br />
                        <Button
                            href="/main"
                            className="btn-round mr-1"
                            color="neutral"
                            outline
                            size='lg'
                        >
                            <i className="nc-icon nc-bullet-list-67" />{" "}
                            Your Tasks
                        </Button>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default LandingPageHeader;
