import { Container } from '@mui/material';
import React from 'react'
import ImagesList from './components/ImageList/ImagesList'
import Upload from './components/upload/Upload'

export default function Gallery() {
  return (
    <>
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: "3rem"}}>
        <Upload />
        <ImagesList />
      </Container>
    </>
  );
}
