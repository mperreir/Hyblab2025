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
                return 'Crédits';
            case '/final':
                return 'Fin';
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
                            <h6 className="mb-0">{getPageTitle()}</h6>
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

export default NavBarComponent;