export const UpdateOwnState = (getdata : any)=>{
    return(dispatch : any)=>{
        dispatch({type:"UPDATE_STATE" , state:Math.random()})
    }
}