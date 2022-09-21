import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useWindowSize } from '../../../hooks/useWindowSize';

export default function Sidebar(props) {
    const { open, onClose } = props;
    const { width } = useWindowSize(); 
    const [openedSubNav, setOpenedSubNav] = useState(false);

    const routes = [
        {
            'name': 'Dashboard',
            'path': '/',
            'icon-class': 'fa-solid fa-house',
            'show': false,
            'showSubRoute': false,
            'subRoutes': [
                {
                    'name': 'subroute 1',
                    'subPath': 'subroute1',
                    'icon-class': '',
                    'show': true
                },
                {
                    'name': 'subroute 2',
                    'subPath': 'subroute2',
                    'icon-class': '',
                    'show': true
                },
                {
                    'name': 'subroute 3',
                    'subPath': 'subroute3',
                    'icon-class': '',
                    'show': true
                }
            ]
        },
        {
            'name': 'Add Item',
            'path': 'product/add-product',
            'icon-class': 'fa-solid fa-circle-plus',
            'show': true
        },
        {
            'name': 'View All Items',
            'path': 'product/all',
            'icon-class': 'fa-solid fa-home',
            'show': true
        },
        {
            'name': 'Shipping Email',
            'path': 'sendmail',
            'icon-class': 'fa-solid fa-envelope',
            'show': true
        },
        {
            'name': 'Email List',
            'path': 'subscriber',
            'icon-class': 'fa-solid fa-list-alt',
            'show': true
        }
    ]

    const handleClose = React.useCallback(() => open && width < 992 && onClose(),
        [open, onClose, width]
    )

    const handleSubNavToggle = (event) => {
        event.stopPropagation();
        const { dataset } = event.target;
        const { routeindex } = dataset;
        setOpenedSubNav((prevState) => prevState === parseInt(routeindex) ? null : parseInt(routeindex))
    }


    return (
        <>
            <div className={`verticle-menu d-block ${open ? "" : "sidebar-close"}`}>
                <div className='h-100 d-flex flex-column justify-content-between side-menu-container'> {/* put classname h-100 if you have enough menu that covers more than view port otherwise put height = 100vh*/}
                    <div>
                        <ul className='list-unstyled' id='side-menu'>
                            {
                                routes.map((route, index) =>
                                    route.show &&
                                    (
                                        <li key={route.path} className="padding-10">
                                            <div className='d-flex justify-content-between align-item-center'>
                                                {/* there can be sub menu thats why this div*/}
                                                <NavLink
                                                    to={route.path}
                                                    className="menu-item-links"
                                                // exact={route.path === '/'}
                                                // activeClassName=""
                                                >

                                                    <i className={route['icon-class']}></i>
                                                    <span className='menu-text'>{route.name}</span>
                                                </NavLink>
                                                {
                                                    route.showSubRoute && route.subRoutes.length > 0 && (
                                                        <i
                                                            className={`fa-solid fa-angle-${
                                                                openedSubNav === index ? "up" : "down"
                                                            } font-size-16 cursor-pointer color-white menu-item-links`}
                                                            role="button"
                                                            data-routeindex={index}
                                                            onClick={handleSubNavToggle}
                                                        ></i>
                                                    )
                                                }
                                            </div>
                                            {
                                                route.showSubRoute && route.subRoutes.length > 0 && (
                                                    <ul
                                                        className={`list-unstyled submenu ${openedSubNav === index ? 'd-block' : "d-none"}`}
                                                    >
                                                        {route.subRoutes.map((subroute) =>
                                                            subroute.show && (
                                                                <li key={subroute.subPath}>
                                                                    
                                                                    <div className='d-flex justify-content-between align-item-center menu-item-wrapper'>
                                                                        <NavLink
                                                                            to={route.path + subroute.subPath}
                                                                            className="menu-item-links submenu-item-links"
                                                                        >
                                                                            <i className="fa-solid fa-angle-right margin-left-10"></i>
                                                                            <span className='margin-left-10 d-inline-block'>{subroute.subPath}</span>
                                                                        </NavLink>
                                                                    
                                                                    </div>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                )

                                            }
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
