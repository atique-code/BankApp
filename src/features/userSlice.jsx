import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const currecyConverter = createAsyncThunk("currency", async (arg, { rejectWithValue }) => {
    console.log("userSlice",arg)
    const {deposite,code } = arg
    if(code === "USD" && deposite > 0 ) return deposite
    else{

        try {
            const resp = await axios.get(`https://api.frankfurter.app/latest?amount=${deposite}&from=${code}&to=USD`)
            const converted = resp.data.rates.USD
            return converted
            
        } catch (error) {
            return rejectWithValue(error)
        }
    }
})


const initialState = {
    deposite: 0,
    withdrow: 0,
    loan: 0,
    purposeLoan: '',
    requestLoan: 0,
    totalAmount: 0,
    isOpen: false,
    OpenModal: false,
    ContryCurrency: ''
}

export const userSlice = createSlice({
    name: 'BankApp',
    initialState,
    reducers: {
        
        withdrowAmount: (state, action) => {
            // console.log(action.payload.withdraw)
            state.withdrow = action.payload.withdraw;
            if (state.withdrow > state.totalAmount) {
                alert("you can not withdraw your amount!!!")
            }
            else if(state.withdrow > 0){
                alert('Successfully withdrawed!!!')
                state.totalAmount = (state.totalAmount - state.withdrow).toFixed(2);
            }
            else if(state.withdrow > 0){
                alert("you can not add your balance...")
            }
            // else {
            // }
            console.log(state.totalAmount)
        },
        RequestPurpose: (state, action) => {
            console.log(action.payload)
            state.purposeLoan = action.payload.purpose;
            state.requestLoan = action.payload.RequestLoan

            if (state.purposeLoan && state.requestLoan > 0) {
                console.log("inside")
                state.totalAmount = Number(state.totalAmount) + Number(state.requestLoan)

            }
        },
        MOdalPayLoan: (state, action) => {
            console.log(action.payload)
            const payBackLoan = action.payload
            // state.totalAmount = state.totalAmount - payBackLoan
        // if(requestLoan< payBackLoan){ 
        if(state.requestLoan<payBackLoan){ 
            

                alert('You did not take Much Loan!!!')
            
            }else if(payBackLoan>0){
                state.requestLoan = state.requestLoan - payBackLoan
                state.totalAmount = state.totalAmount - payBackLoan
            }
        },
        ReqButton: (state, action) => {
            if(state.purposeLoan && state.requestLoan ){
                console.log('loan wala buttn')
                console.log(action)

            state.OpenModal = action.payload
           

               // state.totalAmount = state.totalAmount - state.requestLoan
               // state.totalAmount = state.totalAmount - action.payload.RequestLoan;
           }
        },
        OpenLoanModal: (state, action) => {
            state.isOpen = action.payload
            // console.log(action)
        }
    },
    extraReducers: {
        [currecyConverter.fulfilled]: (state, action) => {
            // console.log(action.payload.rates.USD)
            // const getUSD = action.payload.rates.USD
            // console.log(getUSD, "USD")
            // state.totalAmount = getUSD
            // if(state.totalAmount >0){

                state.totalAmount =  (Number(state.totalAmount) + Number(action.payload)).toFixed(2) 
                console.log(state.totalAmount)
            // }

        },
    }
})

export const {  withdrowAmount, RequestPurpose, ReqButton, OpenLoanModal, MOdalPayLoan } = userSlice.actions;
export default userSlice.reducer;