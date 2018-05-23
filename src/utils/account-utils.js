
export const getAuthUser = ()=>{
	const id = window.sessionStorage.getItem('id');
	if(!id){
		window.location = '/login';
	} else {
		const auth = { id };
		Object.keys(window.sessionStorage)
			.forEach(key => auth[key] = window.sessionStorage.getItem(key));
		return auth;
	}
};
