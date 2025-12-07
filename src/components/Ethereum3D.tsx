import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

export const Ethereum3D = ({ size = 40 }: { size?: number }) => (
  <motion.div
    initial={{ scale: 0.8, rotate: -10 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ duration: 0.5 }}
    style={{ width: size, height: size }}
    className="rounded-lg bg-gradient-to-br from-blue-500/10 to-emerald-500/10 p-1 border border-blue-500/20"
  >
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#627EEA" />
      </mesh>
      <OrbitControls autoRotate enableZoom={false} />
    </Canvas>
  </motion.div>
);
