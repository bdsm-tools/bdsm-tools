import {Easing, Tween} from "@tweenjs/tween.js";
import {useThree} from "@react-three/fiber";

export default function useFocusNode() {
    const { camera } = useThree();

    return (event) => {
        event.stopPropagation();
        const cube = event.eventObject;
        const coords = { x: camera.position.x, y: camera.position.y };
        new Tween(coords)
            .to({ x: cube.position.x, y: cube.position.y })
            .easing(Easing.Quadratic.Out)
            .onUpdate(() => camera.position.set(coords.x, coords.y, camera.position.z))
            .start();
    };
}