import { useState } from "react";

export const useForceUpdate = () => {
  const [update, setUpdate] = useState(false)

  const forceUpdate = () => {
    setUpdate(v => !v)
  }

  return [update, forceUpdate]
}