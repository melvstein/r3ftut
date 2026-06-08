import { useGLTF, useAnimations } from "@react-three/drei"
import { useEffect } from "react"
import { useControls } from "leva"

export default function Fox() {
  const fox = useGLTF('./models/Fox/glTF/Fox.gltf')
  const animations = useAnimations(fox.animations, fox.scene)

  const animationsSettings = useControls('fox animations', {
    animationName: {
      options: animations.names,
    }
  }, { collapsed: true })

  useEffect(() => {
    if (!animations) return
    const action = animations.actions[animationsSettings.animationName]

    if (!action) return

      action.reset().fadeIn(0.5).play()

    /* window.setTimeout(() => {
      if (animations.actions.Walk && animations.actions.Run) {
        animations.actions.Walk.play()
        animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
      }
    }, 2000) */

    return () => {
      if (action) {
        // action.stop()
        action.fadeOut(0.5)
      }
    }
  }, [animations, animationsSettings.animationName])
  
  return (
    <primitive object={ fox.scene } scale={ 0.05 } position-x={ 2 } />
  )
}