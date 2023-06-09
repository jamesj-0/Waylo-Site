import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  BakeShadows,
  Lightformer,
  Center,
} from '@react-three/drei';
import { Model } from './Waylo';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import Box from '@mui/material/Box';

export default function App() {
  return (
    <Box sx={{ height: '100vh', width: '100vw' }}>
      <Canvas eventPrefix="client" shadows camera={{ position: [0, 0, 10] }}>
        <Stars />
        <group position={[0, -1, -2]}>
          <Center position={[0, 1.08, -2]}>
            <Model scale={0.3} />
          </Center>
          <BakeShadows />
          <pointLight position={[10, 10, 5]} />
          <pointLight position={[-10, -10, -5]} color="#ff8f00" />
          <ambientLight intensity={0.4} />
          <ambientLight intensity={0.015} />
          <OrbitControls />
          <Environment
            files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr"
            background
            blur={0.6}
          >
            <Lightformer
              form="ring"
              color="#FFA0E0"
              intensity={1}
              scale={10}
              position={[-15, 4, -18]}
              target={[0, 0, 0]}
            />
          </Environment>
        </group>
        <Rig />
      </Canvas>
    </Box>
  );
}

function Rig({ vec = new THREE.Vector3() }) {
  useFrame((state) => {
    state.camera.position.lerp(vec.set(0.3 + state.pointer.x, 0.3, 9), 0.01);
    state.camera.lookAt(0, 0, 0);
  });
}

function Stars(props) {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(1000), { radius: 10 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
