'use client';
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import MenuOverlay from './MenuOverlay';
import NavLink from '@/src/components/navbar/NavLink';
import { navlinks } from '@Data/navbar';

import '@Components/navbar/navbar.scss';

const Navbar = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<div className="mobile_menu">
					{!navbarOpen ? (
						<button
							onClick={() => {
								setNavbarOpen(true);
							}}
						>
							<Bars3Icon />
						</button>
					) : (
						<button
							onClick={() => {
								setNavbarOpen(false);
							}}
						>
							<XMarkIcon />
						</button>
					)}
				</div>

				<div className="menu" id="navbar">
					<ul className="">
						{navlinks.map((link, index) => (
							<li key={index}>
									<NavLink
										title={link.title}
										href={link.path}
									/>
							</li>
						))}
					</ul>
				</div>
			</div>
			{navbarOpen ? <MenuOverlay links={navlinks} /> : null}
		</nav>
	);
};

export default Navbar;
