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
  // PivotControls.onDrag expects function signature to be l, dl, w, dw 
  const position = new THREE.Vector3()
  if (w && w.elements) {
    w.decompose(position, new THREE.Quaternion(), new THREE.Vector3())
    const distance = position.distanceTo(targetPosition);
    if (distance <= distanceThreshold) {
      setTargetReached(true);
    }
  }
};

class Organ {
  constructor(modelPath, scale, distanceThreshold, targetPosition, startingPosition) {
    this.model = useGLTF(modelPath);
    this.scale = scale;
    this.distanceThreshold = distanceThreshold;
    this.targetPosition = targetPosition;
    this.objRef = useRef();
    this.startingPosition = startingPosition;
  }
};

export const AnatomyLevel1 = () => {
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

  const brainOrgan = new Organ('models/brain/scene.gltf', 0.44, 0.1, new THREE.Vector3(0, 4.15, -0.045), [-2, 0, 2]);
  const lungsOrgan = new Organ('models/lungs/scene.gltf', 2.5, 0.1, new THREE.Vector3(0, 3.2, 0.05), [-3, 0, 2.5]);
  const heartOrgan = new Organ('models/heart/scene.gltf', 0.15, 0.1, new THREE.Vector3(0.07, 3.38, 0.052), [-2.5, 0, 3.0]);
  const digestiveOrgan = new Organ('models/digestive/scene.gltf', 1.6, 0.1, new THREE.Vector3(0, 2.34, 0), [-4, 0, 3]);

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
    // not displaying anything - just used to run the update logic every frame
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

export const AnatomyLevel2 = () => {
  const HumanFigure = () => {
    const body = useGLTF('models/body/scene.gltf');
    const scaleBody = 1.0;
    setTransparency(body, 0.5);
    return <primitive object={body.scene} scale={scaleBody} />
  };

  const SkeletonDisplay = ({ skeleton, checkDistanceOnDrag, draggable, rotation = [0, 0, 0], anchorPosition = [0.75, 0.75, 0.75] }) => {
    if (draggable) {
      return (
        <group ref={skeleton.objRef} position={skeleton.startingPosition}>
          <PivotControls anchor={anchorPosition} scale={0.5} disableRotations={true} onDrag={checkDistanceOnDrag}>
            <primitive object={skeleton.model.scene} scale={skeleton.scale} position={[0, 0, 0]} rotation={rotation} />
          </PivotControls>
        </group>
      )
    }
    else {
      return (
        <group position={skeleton.targetPosition}>
          <primitive object={skeleton.model.scene} scale={skeleton.scale} position={[0, 0, 0]} />
        </group>
      )
    }
  }

  const [allTargetsReached, setAllTargetsReached] = useState(false);

  // state vars for each organ
  const [reachedTargetJaw, setReachedTargetJaw] = useState(false);
  const [reachedTargetSkull, setReachedTargetSkull] = useState(false);
  const [reachedTargetUpperLegL, setReachedTargetUpperLegL] = useState(false);
  const [reachedTargetUpperLegR, setReachedTargetUpperLegR] = useState(false);
  const [reachedTargetFibulaR, setReachedTargetFibulaR] = useState(false);
  const [reachedTargetFibulaL, setReachedTargetFibulaL] = useState(false);
  const [reachedTargetLowerLegR, setReachedTargetLowerLegR] = useState(false);
  const [reachedTargetLowerLegL, setReachedTargetLowerLegL] = useState(false);
  const [reachedTargetLeftArm, setReachedTargetLeftArm] = useState(false);
  const [reachedTargetRightArm, setReachedTargetRightArm] = useState(false);
  const [reachedTargetSpine, setReachedTargetSpine] = useState(false);
  const [reachedTargetRibs, setReachedTargetRibs] = useState(false);

  const allSkeletonStates = [
    reachedTargetJaw,
    reachedTargetSkull,
    reachedTargetUpperLegL,
    reachedTargetUpperLegR,
    reachedTargetFibulaR,
    reachedTargetFibulaL,
    reachedTargetLowerLegR,
    reachedTargetLowerLegL,
    reachedTargetLeftArm,
    reachedTargetRightArm,
    reachedTargetSpine,
    reachedTargetRibs
  ];

  const jawSkeleton = new Organ('models/bones/bone_jaw.gltf', 0.5, 0.1, new THREE.Vector3(0.0015, 4.1317, 0.02), [-3, 0, 3]);
  const skullSkeleton = new Organ('models/bones/bone_skull.gltf', 0.5, 0.1, new THREE.Vector3(0.005, 4.19, 0.04), [-4, 0.2, 4]);
  const upperLegLSkeleton = new Organ('models/bones/bone_upper_leg_left.gltf', 0.5, 0.1, new THREE.Vector3(0.28, 1.45, 0.005), [-4, 0, 0]);
  const upperLegRSkeleton = new Organ('models/bones/bone_upper_leg_right.gltf', 0.5, 0.1, new THREE.Vector3(-0.28, 1.45, 0.005), [-3, 0, 1]);
  const fibulaRSkeleton = new Organ('models/bones/bone_fibula_right.gltf', 0.5, 0.1, new THREE.Vector3(-0.42, 0.77, -0.18), [-2, 0.3, 2]);
  const fibulaLSkeleton = new Organ('models/bones/bone_fibula_left.gltf', 0.5, 0.1, new THREE.Vector3(0.32, 1.25, -0.2), [-3, 0.8, 2]);
  const lowerLegRSkeleton = new Organ('models/bones/bone_lower_leg_right.gltf', 0.505, 0.1, new THREE.Vector3(-0.3887, 1.22, -0.12), [-3.5, 0.8, 2]);
  const lowerLegLSkeleton = new Organ('models/bones/bone_lower_leg_left.gltf', 0.505, 0.1, new THREE.Vector3(0.3991, 1.22, -0.12), [-4, 0.8, 2]);
  const leftArmSkeleton = new Organ('models/bones/arm_left/scene.gltf', 0.505, 0.1, new THREE.Vector3(-2.75339, 2.16307, -1.00368), [-7, -0.5, -2.5]);
  const rightArmSkeleton = new Organ('models/bones/arm_right/scene.gltf', 0.505, 0.1, new THREE.Vector3(0.756045, 0.55942, -1.19763), [0.05, -2, -4]);
  const spineSkeleton = new Organ('models/bones/spine/scene.gltf', 0.00624, 0.1, new THREE.Vector3(-0.035, 2.25, 0.005), [-4.5, 0, 1]);
  const ribsSkeleton = new Organ('models/bones/ribs/scene.gltf', 0.0743, 0.1, new THREE.Vector3(0.0015, 2.85, 0.0076), [-2, 0, -1]);


  const checkDistanceOnDragJaw = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, jawSkeleton.targetPosition, jawSkeleton.distanceThreshold, setReachedTargetJaw)
  };
  const checkDistanceOnDragSkull = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, skullSkeleton.targetPosition, skullSkeleton.distanceThreshold, setReachedTargetSkull)
  };
  const checkDistanceOnDragUpperLegL = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, upperLegLSkeleton.targetPosition, upperLegLSkeleton.distanceThreshold, setReachedTargetUpperLegL)
  };
  const checkDistanceOnDragUpperLegR = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, upperLegRSkeleton.targetPosition, upperLegRSkeleton.distanceThreshold, setReachedTargetUpperLegR)
  };
  const checkDistanceOnDragFibulaR = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, fibulaRSkeleton.targetPosition, fibulaRSkeleton.distanceThreshold, setReachedTargetFibulaR)
  };
  const checkDistanceOnDragFibulaL = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, fibulaLSkeleton.targetPosition, fibulaLSkeleton.distanceThreshold, setReachedTargetFibulaL)
  };
  const checkDistanceOnDragLowerLegR = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, lowerLegRSkeleton.targetPosition, lowerLegRSkeleton.distanceThreshold, setReachedTargetLowerLegR)
  };
  const checkDistanceOnDragLowerLegL = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, lowerLegLSkeleton.targetPosition, lowerLegLSkeleton.distanceThreshold, setReachedTargetLowerLegL)
  };
  const checkDistanceOnDragLeftArm = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, leftArmSkeleton.targetPosition, leftArmSkeleton.distanceThreshold, setReachedTargetLeftArm)
  };
  const checkDistanceOnDragRightArm = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, rightArmSkeleton.targetPosition, rightArmSkeleton.distanceThreshold, setReachedTargetRightArm)
  };
  const checkDistanceOnDragSpine = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, spineSkeleton.targetPosition, spineSkeleton.distanceThreshold, setReachedTargetSpine)
  };
  const checkDistanceOnDragRibs = (l, dl, w, dw) => {
    checkDistanceOnDrag(l, dl, w, dw, ribsSkeleton.targetPosition, ribsSkeleton.distanceThreshold, setReachedTargetRibs)
  };


  const Jaw = ({ draggable }) => {
    return <SkeletonDisplay skeleton={jawSkeleton} checkDistanceOnDrag={checkDistanceOnDragJaw} draggable={draggable} rotation={[2.2, 0, 0]} />
  };
  const Skull = ({ draggable }) => {
    return <SkeletonDisplay skeleton={skullSkeleton} checkDistanceOnDrag={checkDistanceOnDragSkull} draggable={draggable} rotation={[0, 0, 0]} />
  };
  const UpperLegL = ({ draggable }) => {
    return <SkeletonDisplay skeleton={upperLegLSkeleton} checkDistanceOnDrag={checkDistanceOnDragUpperLegL} draggable={draggable} rotation={[0, 0, 0]} />
  };
  const UpperLegR = ({ draggable }) => {
    return <SkeletonDisplay skeleton={upperLegRSkeleton} checkDistanceOnDrag={checkDistanceOnDragUpperLegR} draggable={draggable} rotation={[0, 0, 0]} />
  };
  const FibulaR = ({ draggable }) => {
    return <SkeletonDisplay skeleton={fibulaRSkeleton} checkDistanceOnDrag={checkDistanceOnDragFibulaR} draggable={draggable} rotation={[3.1, 0, 0]} />
  };
  const FibulaL = ({ draggable }) => {
    return <SkeletonDisplay skeleton={fibulaLSkeleton} checkDistanceOnDrag={checkDistanceOnDragFibulaL} draggable={draggable} rotation={[3.1, 0, 0]} />
  };
  const LowerLegR = ({ draggable }) => {
    return <SkeletonDisplay skeleton={lowerLegRSkeleton} checkDistanceOnDrag={checkDistanceOnDragLowerLegR} draggable={draggable} rotation={[3.15, 0, 0]} />
  };
  const LowerLegL = ({ draggable }) => {
    return <SkeletonDisplay skeleton={lowerLegLSkeleton} checkDistanceOnDrag={checkDistanceOnDragLowerLegL} draggable={draggable} rotation={[3.15, 0, 0]} />
  };
  const LeftArm = ({ draggable }) => {
    return <SkeletonDisplay skeleton={leftArmSkeleton} checkDistanceOnDrag={checkDistanceOnDragLeftArm} draggable={draggable} rotation={[0.011354048101568781, 0.014001609606136218, -0.6813951991697313]} anchorPosition={[0.3, 0.3, 0.3]} />
  };
  const RightArm = ({ draggable }) => {
    return <SkeletonDisplay skeleton={rightArmSkeleton} checkDistanceOnDrag={checkDistanceOnDragRightArm} draggable={draggable} rotation={[0.09841546379069474, -0.07174505620204256, 0.6956416135179724]} anchorPosition={[-0.8, 0.4, 0.4]} />
  };
  const Spine = ({ draggable }) => {
    return <SkeletonDisplay skeleton={spineSkeleton} checkDistanceOnDrag={checkDistanceOnDragSpine} draggable={draggable} rotation={[-1.5, 0, 0]} />
  };
  const Ribs = ({ draggable }) => {
    return <SkeletonDisplay skeleton={ribsSkeleton} checkDistanceOnDrag={checkDistanceOnDragRibs} draggable={draggable} />
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
  function RotatingBodyWithSkeleton() {
    const bodyRef = useRef();
    useFrame(() => {
      bodyRef.current.rotation.y += 0.01;
    });

    return (
      <group ref={bodyRef}>
        <HumanFigure />
        <Jaw draggable={false} />
        <Skull draggable={false} />
        <UpperLegL draggable={false} />
        <UpperLegR draggable={false} />
        <FibulaR draggable={false} />
        <FibulaL draggable={false} />
        <LowerLegR draggable={false} />
        <LowerLegL draggable={false} />
        <LeftArm draggable={false} />
        <RightArm draggable={false} />
        <Spine draggable={false} />
        <Ribs draggable={false} />

      </group>
    );
  }

  function CheckTargetStates() {
    useFrame(() => {
      // set allTargetsReached to true if all states in allOrganStates are true, i.e. all organs reached target.
      // This is the case if the length and the sum of allOrganStates is equal because false=0 and true=1.
      if (allSkeletonStates.length == allSkeletonStates.reduce((a, b) => a + b, 0)) {
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
            <Jaw draggable={!reachedTargetJaw} />
            <Skull draggable={!reachedTargetSkull} />
            <UpperLegL draggable={!reachedTargetUpperLegL} />
            <UpperLegR draggable={!reachedTargetUpperLegR} />
            <FibulaR draggable={!reachedTargetFibulaR} />
            <FibulaL draggable={!reachedTargetFibulaL} />
            <LowerLegR draggable={!reachedTargetLowerLegR} />
            <LowerLegL draggable={!reachedTargetLowerLegL} />
            <LeftArm draggable={!reachedTargetLeftArm} />
            <RightArm draggable={!reachedTargetRightArm} />
            <Spine draggable={!reachedTargetSpine} />
            <Ribs draggable={!reachedTargetRibs} />

          </>
        )}
        {!allTargetsReached && (
          <SceneGlobalControls />
        )}
        {allTargetsReached && (
          <RotatingBodyWithSkeleton />
        )}
      </Canvas>
    </div>
  )
}