import React, { useEffect, useState } from 'react';

import './Auth.css'

const UserIcon = () => {

	return (
			<svg
				className="user-icon__svg"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 480 480"
				focusable="false"
				enableBackground="new 0 0 512 512"
			>
				<path
					fill='currentColor'
					d="M213.333,0C95.467,0,0,95.467,0,213.333s95.467,213.333,213.333,213.333S426.667,331.2,426.667,213.333S331.2,0,213.333,0
			z M213.333,64c35.307,0,64,28.693,64,64c0,35.413-28.693,64-64,64s-64-28.587-64-64C149.333,92.693,178.027,64,213.333,64z
			 M213.333,366.933c-53.44,0-100.373-27.307-128-68.693c0.533-42.347,85.44-65.707,128-65.707s127.36,23.36,128,65.707
			C313.707,339.627,266.773,366.933,213.333,366.933z"/>

			</svg>
	)
}


export default UserIcon;