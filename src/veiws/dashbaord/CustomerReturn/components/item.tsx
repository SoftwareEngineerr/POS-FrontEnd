import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableRow } from '@mui/material'
import { Components } from '../../../../components'
// import { Components } from '../../../../components'
// import { Components } from '../../../../components'

const Item = ({Addproduct , selectedItem , setSelectedItem , p, i}) => {
    const [checker , setChecker ] = useState()
    const [quantity , setQuantity ] = useState(0)

    useEffect(()=>{
        const findIndex = selectedItem.filter((item)=>item.id == p.id)
        // console.log(findIndex)
        if(findIndex.length == 1){
            setChecker(true)
        }
        else{
            setChecker(false)
        }
    },[selectedItem])
    
  return (
    <TableRow
        key={i}
        sx={{
            "&:hover": {
            backgroundColor: "#f9fafb",
            },
        }}
        >
            <TableCell>
                {
                    p.remaining_quantity > 0 ?
                    <input type="checkbox" onClick={(e)=>Addproduct(p , e)} />
                    :
                    <>
                        Returned All
                    </>
                }
            </TableCell>
            <TableCell>
                {/* <Components.Showimage
                    src={
                        p.product_image
                    }
                    sx={{
                        width: 80 ,
                        height: 80,
                    }}
                /> */}
            </TableCell>
            <TableCell>{p.product_name}</TableCell>
            <TableCell>{p.quantity}</TableCell>
            <TableCell>{p.quantity - p.remaining_quantity}</TableCell>
            <TableCell>{Number(p.perproduct).toFixed(1)}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
                {p.total_cost}
            </TableCell>
            {
                checker ? 
            <TableCell sx={{ fontWeight: 600 }}>
                <Components.Input
                size="small"
                sx={{
                    maxWidth:"100px"
                }}
                type="number"
                placeholder={`Max Q (${p.remaining_quantity})`}                
                inputProps={{
                max: p.remaining_quantity,
                min: 0, // optional but recommended
                }}
              value={quantity}

                
              onChange={(e) => {
                const val = Number(e.target.value || 0);
                const findIndex = selectedItem.findIndex((item)=>item.id == p.id)
                console.log(findIndex)
                if (val > p.remaining_quantity) return;
                selectedItem[findIndex].returnquantity = val
                const newdata = selectedItem 
                setSelectedItem(newdata)
                setQuantity(val);
                
            //     setKhataAmount(finalAmount - val);
              }}
                />
            </TableCell>
            :
            null
            }
            
        </TableRow>
  )
}

Item.propTypes = {}

export default memo(Item)