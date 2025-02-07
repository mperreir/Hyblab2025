import React from 'react';
import { Navbar, Container, ProgressBar, Breadcrumb } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './NavBarComponent.scss';
import useBasename from '../hooks/useBasenameHook';

const NavBarComponent = ({ showMap, setShowMap }) => {

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
        const totalLevels = 3;

        return [
            {
                id: parseInt(level_id),
                label: `ÉTAPE ${level_id || 1}/${totalLevels}`,
                active: true
            }
        ];
    };

    const progress = getBreadcrumbItems().filter(item => item.active).length * 33.33;

    return (
        show && (
            <Navbar className="custom-navbar" expand="lg" style={{ position: 'absolute' }}>
                <Container fluid className="p-0 px-1">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <Navbar.Brand href={`${basename}`} style={{ marginLeft: '10px' }}>
                            <img
                                src={`${basename}images/logo_jeu2.png`}
                                height="30"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                        </Navbar.Brand>

                        {showMap.btn ?
                            <button className='btn btn-sm btn-outline-light border-2 fw-medium'
                                onClick={() => { setShowMap({btn: true, map: !showMap.map}) }}
                            >VOIR LA CARTE</button> : ""}

                        {shouldShowBreadcrumb() ? (
                            <Breadcrumb className="mb-0" style={{ marginRight: '20px' }}>
                                {getBreadcrumbItems().map((item) => (
                                    <Breadcrumb.Item
                                        key={item.id}
                                        active={item.active}
                                        style={{
                                            color: 'white',
                                            fontSize: '1rem',
                                            fontFamily: 'Work Sans, sans-serif',
                                            fontWeight: 550
                                        }}
                                    >
                                        {item.label}
                                    </Breadcrumb.Item>
                                ))}
                            </Breadcrumb>
                        ) : (
                            <h6 className="mb-0">{getPageTitle()}</h6>
                        )}
                    </div>
                </Container>
            </Navbar>)
    );
};



export default NavBarComponent;