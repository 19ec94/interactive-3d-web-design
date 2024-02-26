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
};

function checkDistanceOnDrag(l, dl, w, dw, targetPosition, distanceThreshold, setTargetReached) {
  const position = new THREE.Vector3()
  if (w && w.elements) {
    w.decompose(position, new THREE.Quaternion(), new THREE.Vector3())
    const distance = position.distanceTo(targetPosition);
    if (distance <= distanceThreshold) {
      setTargetReached(true);
    }
  }
};

function Organ(modelPath, scale, distanceThreshold, targetPosition, startingPosition) {
  this.model = useGLTF(modelPath);
  this.scale = scale;
  this.distanceThreshold = distanceThreshold;
  this.targetPosition = targetPosition;
  this.objRef = useRef();
  this.startingPosition = startingPosition;
};

export const Anatomy = () => {
  const HumanFigure = () => {
    const body = useGLTF('models/body/scene.gltf');
    const scaleBody = 1.0;
    setTransparency(body, 0.5);
    return <primitive object={body.scene} scale={scaleBody} />
  };

  const OrganDisplay = ({ organ, checkDistanceOnDrag, draggable }) => {
    if (draggable) {
      return (
        <group ref={organ.objRef} position={organ.startingPosition}>
          <PivotControls anchor={[0.75, 0.75, 0.75]} scale={0.5} disableRotations={true} onDrag={checkDistanceOnDrag}>
            <primitive object={organ.model.scene} scale={organ.scale} position={[0, 0, 0]} />
          </PivotControls>
        </group>
      )
    }
    else {
      return (
        <group position={organ.targetPosition}>
          <primitive object={organ.model.scene} scale={organ.scale} position={[0, 0, 0]} />
        </group>
      )
    }
  }

  const [allTargetsReached, setAllTargetsReached] = useState(false);

  // state vars for each organ
  const [reachedTargetBrain, setReachedTargetBrain] = useState(false);
  const [reachedTargetLungs, setReachedTargetLungs] = useState(false);
  const [reachedTargetHeart, setReachedTargetHeart] = useState(false);
  const [reachedTargetDigestive, setReachedTargetDigestive] = useState(false);

  const allOrganStates = [reachedTargetBrain, reachedTargetLungs, reachedTargetHeart, reachedTargetDigestive];

  const brainOrgan = new Organ('models/brain/scene.gltf', 0.44, 0.5, new THREE.Vector3(0, 4.15, -0.045), [-2, 0, 2]);
  const lungsOrgan = new Organ('models/lungs/scene.gltf', 2.5, 0.5, new THREE.Vector3(0, 3.2, 0.05), [-3, 0, 2.5]);
  const heartOrgan = new Organ('models/heart/scene.gltf', 0.15, 0.5, new THREE.Vector3(0.07, 3.38, 0.052), [-2.5, 0, 3.0]);
  const digestiveOrgan = new Organ('models/digestive/scene.gltf', 1.6, 0.5, new THREE.Vector3(0, 2.34, 0), [-4, 0, 3]);

  const checkDistanceOnDragBrain = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, brainOrgan.targetPosition, brainOrgan.distanceThreshold, setReachedTargetBrain)
  };
  const checkDistanceOnDragLungs = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, lungsOrgan.targetPosition, lungsOrgan.distanceThreshold, setReachedTargetLungs)
  };
  const checkDistanceOnDragHeart = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, heartOrgan.targetPosition, heartOrgan.distanceThreshold, setReachedTargetHeart)
  };
  const checkDistanceOnDragDigestive = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, digestiveOrgan.targetPosition, digestiveOrgan.distanceThreshold, setReachedTargetDigestive)
  };

  const Brain = ({ draggable }) => {
    return <OrganDisplay organ={brainOrgan} checkDistanceOnDrag={checkDistanceOnDragBrain} draggable={draggable} />
  };
  const Lungs = ({ draggable }) => {
    return <OrganDisplay organ={lungsOrgan} checkDistanceOnDrag={checkDistanceOnDragLungs} draggable={draggable} />
  };
  const Heart = ({ draggable }) => {
    return <OrganDisplay organ={heartOrgan} checkDistanceOnDrag={checkDistanceOnDragHeart} draggable={draggable} />
  };
  const Digestive = ({ draggable }) => {
    return <OrganDisplay organ={digestiveOrgan} checkDistanceOnDrag={checkDistanceOnDragDigestive} draggable={draggable} />
  };

  const SceneGlobalControls = () => {
    return (
      <>
        <OrbitControls makeDefault enableDamping={false} />
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
      </>
    )
  }
  function RotatingBodyWithOrgans() {
    const bodyRef = useRef();
    useFrame(() => {
      bodyRef.current.rotation.y += 0.01;
    });

    return (
      <group ref={bodyRef}>
        <HumanFigure />
        <Brain draggable={false} />
        <Lungs draggable={false} />
        <Heart draggable={false} />
        <Digestive draggable={false} />
      </group>
    );
  }

  function CheckTargetStates() {
    useFrame(() => {
      // set allTargetsReached to true if all states in allOrganStates are true, i.e. all organs reached target.
      // This is the case if the length and the sum of allOrganStates is equal because false=0 and true=1.
      if (allOrganStates.length == allOrganStates.reduce((a, b) => a + b, 0)) {
        setAllTargetsReached(true);
      }
    });
    return (<></>)
  }

  return (
    <div id="canvas-container" >
      <Canvas style={{ width: '100%', height: '100vh' }}>
        <PerspectiveCamera makeDefault position={[-3, 4, 10]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
        <Grid position={[0, -0.01, 0]} args={[10, 10]} />

        <CheckTargetStates />

        {!allTargetsReached &&
          <HumanFigure />
        }
        {!allTargetsReached && (
          <>
            <Brain draggable={!reachedTargetBrain} />
            <Lungs draggable={!reachedTargetLungs} />
            <Heart draggable={!reachedTargetHeart} />
            <Digestive draggable={!reachedTargetDigestive} />
          </>
        )}
        {!allTargetsReached && (
          <SceneGlobalControls />
        )}
        {allTargetsReached && (
          <RotatingBodyWithOrgans />
        )}
      </Canvas>
    </div>
  )
}