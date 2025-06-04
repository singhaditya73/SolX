import { Html } from "@react-three/drei"

export default function Loading() {
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-purple-600 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white font-medium">Loading 3D Assets</p>
      </div>
    </Html>
  )
}
