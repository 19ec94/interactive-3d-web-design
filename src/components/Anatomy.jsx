import './Anatomy.css';
import { useRef, useState } from 'react';
import { useFrame, Canvas } from '@react-three/fiber'
import { Grid, OrbitControls, useGLTF, PivotControls, GizmoHelper, GizmoViewport } from "@react-three/drei"
import * as THREE from 'three';
import { PerspectiveCamera } from '@react-three/drei';

function setTransparency(modelObject, opacity) {
  if (modelObject.nodes.root) {
    modelObject.nodes.root.traverse(child => {
      if (child.isMesh) {
        child.material.transparent = true;
        child.material.opacity = opacity;
      }
    });
  }
}

export const Anatomy = () => {
  const body = useGLTF('models/body/scene.gltf');
  const brain = useGLTF('models/brain/scene.gltf');
  setTransparency(body, 0.5)
  const [reachedTarget, setReachedTarget] = useState(false);
  const objectRef = useRef();
  const targetPosition = useRef(new THREE.Vector3(0, 4.15, -0.035));
  const distanceThreshold = 1;

  const checkDistanceOnDrag = (l, dl, w, dw) => {
    const position = new THREE.Vector3()
    if (w && w.elements) {
      w.decompose(position, new THREE.Quaternion(), new THREE.Vector3())
      if (objectRef.current) {
        const distance = position.distanceTo(targetPosition.current);
        console.log('Distance:', distance);
        if (distance <= distanceThreshold) {
          setReachedTarget(true);
        }
      }
    }
  }

  function RotatingBodyWithOrgan() {
    const bodyRef = useRef();
    useFrame(() => {
      bodyRef.current.rotation.y += 0.01;
    });

    return (
      <group ref={bodyRef}>
        <primitive object={body.scene} scale={1} />
        <group position={[0, 4.15, -0.045]}>
          <primitive object={brain.scene} scale={0.44} position={[0, 0, 0]} />
        </group>
      </group>
    );
  }

  return (
    <div id="canvas-container" >
      <Canvas style={{ width: '100%', height: '100vh' }}>
        <PerspectiveCamera makeDefault position={[-3, 4, 10]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
        <Grid position={[0, -0.01, 0]} args={[10, 10]} />
        {!reachedTarget &&
          <primitive object={body.scene} scale={1} />
        }
        {!reachedTarget && (
          <group ref={objectRef} position={[-2, 0, 2]}>
            <PivotControls anchor={[0.75, 0.75, 0.75]} scale={0.5} disableRotations={true} onDrag={checkDistanceOnDrag}>
              <primitive object={brain.scene} scale={0.44} position={[0, 0, 0]} />
            </PivotControls>
          </group>
        )}
        {!reachedTarget && (
          <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
          </GizmoHelper>
        )}
        {!reachedTarget && (
          <OrbitControls makeDefault />
        )}
        {reachedTarget && (
          <RotatingBodyWithOrgan />
        )}
      </Canvas>
    </div>
  )
}