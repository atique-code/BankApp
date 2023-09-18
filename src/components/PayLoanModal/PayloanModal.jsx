import { Box, Button, Modal, OutlinedInput, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MOdalPayLoan, OpenLoanModal } from '../../features/userSlice'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const PayloanModal = () => {
  const getdata = useSelector((state) => state.app)
  const { isOpen, requestLoan } = getdata;

  const dispatch = useDispatch()

  let returnAmount
  const handlePayLoan = (e) => {
    returnAmount = Number(e.target.value)
  }


  const handleClose = () => {
    dispatch(OpenLoanModal(false))
    dispatch(MOdalPayLoan(returnAmount))
  }

  return (
    <Stack justifyContent={'center'}>

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You have Taken {requestLoan} amount
          </Typography>
          <Stack>
            <OutlinedInput type='number' placeholder='Enter your loan amount' onChange={handlePayLoan} />
          </Stack>
          <Button variant='contained' onClick={handleClose} sx={{marginTop: '8px'}}>Pay</Button>
        </Box>
      </Modal>
    </Stack>

  )
}

export default PayloanModal
