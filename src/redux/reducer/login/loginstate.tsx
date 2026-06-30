const initialState = {
    data:'',
};

const LoginState = (state = initialState  , action : any) => {
    switch(action.type ){
        // Show Loader
        case 'FETCH_DATA_SUCCESS':
            return {...state , data: action.userdata }   
        default : 
        return state;
    }
}
export default LoginState;
