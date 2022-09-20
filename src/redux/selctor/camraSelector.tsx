
import { useAppSelector } from '../app/hooks'

export const useCamera = () => {
    const selectImage = useAppSelector((state) => state.camra)
    return { selectImage }
}
