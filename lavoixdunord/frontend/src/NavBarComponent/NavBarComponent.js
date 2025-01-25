import React from 'react';
import { Navbar, Container, ProgressBar, Breadcrumb } from 'react-bootstrap';
import './NavBarComponent.scss';
import useBasename from '../hooks/useBasenameHook';

const NavBarComponent = () => {

    const basename = useBasename();

    const [progress, setProgress] = React.useState(33);
    const pathItems = [
        { id: 1, label: "Parcours 1", path: "#", active: true },
        { id: 2, label: "Parcours 2", path: "#", active: false },
        { id: 3, label: "Parcours 3", path: "#", active: false },
    ];

    const calculateProgress = () => {
        const activeCount = pathItems.filter(item => item.active).length;
        return (activeCount / pathItems.length) * 100;
    };

    // Update active state when navigating
    const handleNavigation = (path) => {
        const currentIndex = pathItems.findIndex(item => item.path === path);
        pathItems.forEach((item, index) => {
            item.active = index <= currentIndex;
        });
        setProgress(calculateProgress());
    };

    return (
        <Navbar className="custom-navbar" expand="lg" style={{ position: 'absolute' }}>
            <Container fluid className="p-0 px-1">
                <div className="d-flex justify-content-between align-items-center w-100">
                    {/* Logo */}
                    <Navbar.Brand href="#home">
                        <img
                            src={`${basename}images/logo_jeu.png`}
                            // width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                    </Navbar.Brand>

                    <Breadcrumb className="mb-0">
                        {pathItems.map((item) => (
                            <Breadcrumb.Item
                                key={item.id}
                                active={item.active}
                                href={item.path}
                            >
                                {item.label}
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </div>

                {/* Progress Bar */}
                <ProgressBar
                    now={progress}
                    className="navbar-progress"
                    variant='warning'
                    animated
                    style={{ height: '5px' }}
                />
            </Container>
        </Navbar>
    );
};

export default NavBarComponent;