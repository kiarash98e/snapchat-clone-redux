import { createSlice , PayloadAction } from '@reduxjs/toolkit'

interface User{
    username:string | any,
    profilePic: string | any,
    id:string | any
}

interface State {
    camraImage:any | string
    user:User | any,
    selectedImage:any
}

const intialState: State = {
    camraImage: '',
    user:null,
    selectedImage:null
}

const camraSlice = createSlice({
    name:"camra",
    initialState:intialState,
    reducers:{
        setCamraImage: (state,action:PayloadAction<string>) => {
            state.camraImage = action.payload
        },
        resetCamra: (state) => {
            state.camraImage = ''
        },
        login: (state,action:PayloadAction<User>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        selectedImg: (state,action:PayloadAction<any>) => {
            state.selectedImage = action.payload
        },
        resetSelectImg: (state) => {
            state.selectedImage = null
        }
    },
})

export const {
    setCamraImage,
    resetCamra,
    resetSelectImg,
    login,
    logout,
    selectedImg
} = camraSlice.actions
export default camraSlice.reducer