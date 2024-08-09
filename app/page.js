'use client'
//import Image from "next/image";
//import styles from "./page.module.css";
import {Box, Stack, Typography, Button, Modal, TextField} from '@mui/material'
import {firestore} from './firebase'
import {collection, getDocs, query, doc, setDoc, deleteDoc, getDoc} from 'firebase/firestore'
import {useEffect, useState} from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([])
  const [itemName, setItemName] = useState('')
  const [searchVal, setSearchVal] = useState('')

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    var found = null
    var pantryList = []

    docs.forEach((doc) => {
      pantryList.push({"name": doc.id, ...doc.data()})
      if (doc.id === searchVal){
        found = {"name": searchVal, ...doc.data()}
      }
    })

    if (found != null) {
      pantryList = []
      pantryList.push(found)
    }

    console.log(pantryList)
    setPantry(pantryList)
  }

  const searchIfFound = (item) => {
    updatePantry()
  }

  useEffect(() => {
    updatePantry()
  }, [])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      await setDoc(docRef, {count: count + 1})
    }
    else{
      await setDoc(docRef, {count: 1})
    }
    await updatePantry()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      if (count === 1) {
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef, {count: count - 1})
      }
    }
    await updatePantry()
  }

  return (
  <Box
    width="100vw" 
    height="100vh" 
    display={'flex'}  
    flexDirection={'column'}
    alignItems={'center'}
    bgcolor={"#f79256"}
    gap={2}
  >
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" color={'black'} fontFamily={'Segoe UI'}>
          Add Item
        </Typography>
        <Stack width="100%" direction={'row'} spacing={2}>
          <TextField 
            id="outlined-basic" 
            label="Item" 
            variant="outlined" 
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button
            variant="outlined" 
            onClick={() => {
              addItem(itemName)
              handleClose()
            }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
    <Box border={'25px solid #d16459'}>
      <Box 
        width="100vw" 
        height="100px" 
        bgcolor={'#ffd2a9'} 
        display={'flex'} 
        justifyContent={'center'} 
        alignItems={'center'}
      >
        <Typography variant={'h2'} color={'#0f0f0f'} textAlign={'center'} fontFamily={'Segoe UI'}>
          Food Pantry
        </Typography>
      </Box>
      <Stack width="100vw" height="400px" spacing={2} overflow={'auto'} padding={5}>
        {pantry.map(({name, count}) => (
          <Box
            key={name}
            width="100%" 
            minHeight="100px" 
            display={'flex'} 
            justifyContent={'space-between'} 
            alignItems={'center'}
            bgcolor={"#fbecde"}
            paddingX={5}
            border={'1px solid #301934'}
            borderRadius={'10px'}
          >
            <Typography variant={'h4'} color={'#0f0f0f'} textAlign={'center'} fontFamily={'Segoe UI'}>
              {
                name.charAt(0).toUpperCase() + name.slice(1)
              }
            </Typography>

            <Typography variant={'h4'} color={'#0f0f0f'} textAlign={'center'} fontFamily={'Segoe UI'}>
              {count}
            </Typography>

            <Button variant="contained" onClick={() => addItem(name)}>
              Add
            </Button>
            <Button variant="contained" onClick={() => removeItem(name)}>
              Remove
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
    <TextField 
        id="outlined-basic" 
        label="Search Item" 
        variant="filled"
        onChange={(e) => {setSearchVal(e.target.value)}}
    />
    {searchIfFound()}
    <Button variant="contained" onClick={handleOpen}>Add</Button>
  </Box>
  );
}
