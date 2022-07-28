import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";

const AppProvider = (props) => {

	const [store, setStore] = useState({
		activeMenu: {},
		sidebarActive: true
	});

    useEffect(() => {
		
	}, []);

	return (
		<AppContext.Provider value={[store, setStore]}>
			{props.children}
		</AppContext.Provider>
	)
};

export default AppProvider;