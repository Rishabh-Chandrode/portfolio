import React from 'react';
import NavLink from './NavLink';
import { NavLink as NavLink_T } from '@Types/navbar/navbar';


const MenuOverlay = ({links} : {links: NavLink_T[]}) => {
  return (
    <ul className='flex flex-col py-4 items-center'>
        {links.map( (link,index) => (
            <li key={index}>
            <NavLink href={link.path} title={link.title} />
            </li>
        ) )}
    </ul>
  );
};

export default MenuOverlay;