import React from 'react';
import { Navbar, Container, ProgressBar, Breadcrumb } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './NavBarComponent.scss';
import useBasename from '../hooks/useBasenameHook';

const NavBarComponent = () => {

    const [show, setShow] = React.useState(true);
    const basename = useBasename();
    const location = useLocation();

    React.useEffect(() => {
        if (location.pathname === '/') {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [location.pathname, show]);

    const getUrlParams = () => {
        const parts = location.pathname.split('/');
        return {
            difficulty: parts[2],
            id: parts[3],
            isTransition: parts[1] === 'transition'
        };
    };

    const { difficulty, id: level_id, isTransition } = getUrlParams();

    const shouldShowBreadcrumb = () => {
        return location.pathname.includes('/start/') ||
            location.pathname.includes('/transition/');
    };

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Accueil';
            case '/home':
                return '';
            case '/regles':
                return '';
            case '/difficulty':
                return '';
            case '/credit':
                return '';
            case '/final':
                return '';
            default:
                return '';
        }
    };

    const getBreadcrumbItems = () => {
        return [
            {
                id: 1,
                label: "Parcours 1",
                active: !!difficulty
            },
            {
                id: 2,
                label: "Parcours 2",
                active: !!difficulty && (
                    ((level_id && parseInt(level_id) >= 1) &&
                        isTransition)
                    || ((level_id && parseInt(level_id) >= 2) && !isTransition)
                )
            },
            {
                id: 3,
                label: "Parcours 3",
                active: !!difficulty && (
                    ((level_id && parseInt(level_id) >= 2) &&
                        (isTransition && (parseInt(level_id) >= 2)))
                    || ((level_id && parseInt(level_id) >= 3) && !isTransition)
                )
            }
        ];
    };

    const progress = getBreadcrumbItems().filter(item => item.active).length * 33.33;

    return (
        show && (
            <Navbar className="custom-navbar" expand="lg" style={{ position: 'absolute' }}>
                <Container fluid className="p-0 px-1">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <Navbar.Brand href={`${basename}`}>
                            <img
                                src={`${basename}images/logo_jeu.png`}
                                height="30"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                        </Navbar.Brand>

                        {shouldShowBreadcrumb() ? (
                            <Breadcrumb className="mb-0">
                                {getBreadcrumbItems().map((item) => (
                                    <Breadcrumb.Item
                                        key={item.id}
                                        active={item.active}
                                    >
                                        {item.label}
                                    </Breadcrumb.Item>
                                ))}
                            </Breadcrumb>
                        ) : (
                            <CyclistAnimation />
                            // <h6 className="mb-0">{getPageTitle()}</h6>
                        )}
                    </div>

                    {/* <ProgressBar
                    now={progress}
                    className="navbar-progress"
                    variant='warning'
                    animated
                    style={{ height: '5px' }}
                /> */}

                </Container>
            </Navbar>)
    );
};



const CyclistAnimation = () => {
    return (
        <div className="cyclist-container" style={{ width: '40px', height: '40px' }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                className="cyclist-svg"
            >
                {/* Bicycle Wheels */}
                <circle
                    cx="50"
                    cy="150"
                    r="30"
                    stroke="#6BADC6"
                    strokeWidth="5"
                    fill="none"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 50 150"
                        to="360 50 150"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle
                    cx="150"
                    cy="150"
                    r="30"
                    stroke="#6BADC6"
                    strokeWidth="5"
                    fill="none"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 150 150"
                        to="360 150 150"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </circle>

                {/* Cyclist Body */}
                <circle cx="100" cy="80" r="10" fill="#6BADC6" />
                <line
                    x1="100"
                    y1="90"
                    x2="100"
                    y2="120"
                    stroke="#6BADC6"
                    strokeWidth="5"
                />
                <line
                    x1="100"
                    y1="100"
                    x2="70"
                    y2="130"
                    stroke="#6BADC6"
                    strokeWidth="5"
                />
                <line
                    x1="100"
                    y1="100"
                    x2="130"
                    y2="130"
                    stroke="#6BADC6"
                    strokeWidth="5"
                />

                {/* Pedaling Legs */}
                <line
                    x1="100"
                    y1="120"
                    x2="80"
                    y2="150"
                    stroke="#6BADC6"
                    strokeWidth="5"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 100 120"
                        to="360 100 120"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                </line>
                <line
                    x1="100"
                    y1="120"
                    x2="120"
                    y2="150"
                    stroke="#6BADC6"
                    strokeWidth="5"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="360 100 120"
                        to="0 100 120"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                </line>
            </svg>
        </div>
    );
};

export default NavBarComponent;