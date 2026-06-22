const initialState = {
    data:'',
};

const UpdateState = (state = initialState  , action : any) => {
    switch(action.type ){
        // Show Loader
        case 'UPDATE_STATE':
            return {...state , data: action.state }   
        default : 
        return state;
    }
}
export default UpdateState;
