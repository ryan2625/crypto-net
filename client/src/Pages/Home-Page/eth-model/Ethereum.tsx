//@ts-nocheck
import React, { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Eth from "./Eth"
import "../Eth.scss"
import { OrbitControls } from '@react-three/drei'

const Ethereum: React.FC = () => {

  return (
    <div className="main-model-canv">
      <div className="transition"></div>
      <Canvas className="primary-canvas">
        <ambientLight />
        <OrbitControls enableZoom={false} />
        <Eth />
      </Canvas>
    </div>
  )
}

export default Ethereum