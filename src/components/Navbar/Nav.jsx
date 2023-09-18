import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Nav = () => {
    const totalMoney = useSelector((state) => state.app.totalAmount)
    console.log(totalMoney)
    return (
        <Stack alignItems={"center"} flexDirection={'column'}> 
            <Stack >
                <Typography variant='h2' color={'green'} fontWeight={600}><span>🏦</span>HBL</Typography>
            </Stack>
            <Stack sx={{ backgroundColor: "#E5E7E9", padding: '2%', width: '20%', borderRadius: '7%' }}>
                <Stack>
                    <Typography variant='h3' >${totalMoney}</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Nav
