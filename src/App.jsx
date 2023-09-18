import { Button, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ReqButton, RequestPurpose, currecyConverter, OpenLoanModal, withdrowAmount } from "./features/userSlice";
import Nav from "./components/Navbar/Nav";
import { useEffect, useState } from "react";
import PayloanModal from "./components/PayLoanModal/PayloanModal";

function App() {
  const [data, setData] = useState({})
  const [currency, setCurrency] = useState('USD')
  const dispatch = useDispatch();
  const purposeData = useSelector((state) => state.app)
  const { purposeLoan, isOpen, OpenModal, requestLoan } = purposeData

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
  }

  const handleDeposit = () => {

    dispatch(currecyConverter({ ...data, code: currency }))

  }

  const handleWithdraw = () => {
    dispatch(withdrowAmount(data))

  }

  const handleTextChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleRequestLoan = () => {
    dispatch(RequestPurpose(data))
    console.log(data)

    dispatch(ReqButton(true))

  }

  const handlePayLoan = () => {
    dispatch(OpenLoanModal(true)) 

  }
  useEffect(() => {
    dispatch(currecyConverter(currency))
  }, [])
  return (
    <Stack  p={2} >
      <Nav />
      <Stack py={8} style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>

        <Stack flexDirection={'column'} justifyContent={'center'} >
          <Stack >
            <Typography paddingTop={2} fontSize={18} fontWeight={600} >Enter deposit Amount</Typography>
            <Stack flexDirection={'row'} gap={1}>
              <OutlinedInput type='number' name="deposite" placeholder="Please enter deposite amount" onChange={handleChange} />
              <select onChange={(e) => setCurrency(e.target.value)} value={currency}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
              <Button variant="contained" onClick={handleDeposit} p={3}>Deposit</Button>
            </Stack>
          </Stack>
          <Stack mt={3}>
            <Typography paddingTop={2} fontSize={18} fontWeight={600}>Enter withdraw Amount</Typography>
            <Stack flexDirection={'row'}>
              <OutlinedInput type='number' name="withdraw" placeholder="Please enter withdraw amount" onChange={handleChange} />
              <Button variant="contained" color="error" onClick={handleWithdraw}>Withdraw</Button>
            </Stack>
          </Stack>
          <Stack mt={3}>

            <Typography paddingTop={2} fontSize={18} fontWeight={600}>Request For Loan</Typography>
            <OutlinedInput type='number' name="RequestLoan" placeholder="Request for your loan" onChange={handleChange} />
            <br />
            <OutlinedInput type='text' name="purpose" placeholder="please enter your purpose for loan" onChange={handleTextChange} />
            <br />
            <Button variant="contained" onClick={handleRequestLoan} disabled={requestLoan >0 ? true : false}>Loan</Button>


          </Stack>

          {OpenModal &&
            <>
              <PayloanModal />

              <Stack flexDirection={'row'} mt={3}>
                <Typography fontSize={'18px'}>{purposeLoan}</Typography>
                <Button variant="contained" color="success" sx={{ marginLeft: '5px' }} onClick={handlePayLoan}>Pay loan</Button>



              </Stack>
            </>
          }


        </Stack>

      </Stack>
    </Stack>
  )
}

export default App;
