import { useEffect, useRef } from "react";

/** Browser-only decorative enhancement; the real product photography remains independent. */
export function FloralSculpture() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};

    void import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0.2, 9);
      scene.add(new THREE.HemisphereLight(0xffffff, 0xffffff, 1.5));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(-3, 5, 6);
      scene.add(light);

      const color = (token: string) => {
        const swatch = document.createElement("canvas").getContext("2d");
        if (!swatch) return new THREE.Color();
        swatch.fillStyle = getComputedStyle(element).getPropertyValue(token).trim();
        swatch.fillRect(0, 0, 1, 1);
        const rgb = swatch.getImageData(0, 0, 1, 1).data;
        return new THREE.Color((rgb[0] ?? 0) / 255, (rgb[1] ?? 0) / 255, (rgb[2] ?? 0) / 255).convertSRGBToLinear();
      };
      const petalMaterial = new THREE.MeshStandardMaterial({ color: color("--primary"), roughness: 0.3, metalness: 0.2, side: THREE.DoubleSide });
      const paleMaterial = new THREE.MeshStandardMaterial({ color: color("--primary-soft"), roughness: 0.35, metalness: 0.12 });
      const stemMaterial = new THREE.MeshStandardMaterial({ color: color("--leaf"), roughness: 0.65 });
      const petals = new THREE.SphereGeometry(1, 32, 24);
      const stems = new THREE.CylinderGeometry(0.025, 0.035, 2, 12);
      const bouquet = new THREE.Group();
      scene.add(bouquet);
      for (let flowerIndex = 0; flowerIndex < 3; flowerIndex++) {
        const flower = new THREE.Group();
        flower.position.set((flowerIndex - 1) * 1.05, flowerIndex === 1 ? 0.4 : -0.1, flowerIndex === 1 ? 0.3 : 0);
        flower.rotation.z = (1 - flowerIndex) * 0.3;
        for (let layer = 0; layer < 3; layer++) {
          const count = 5 + layer * 3;
          for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2 + layer * 0.4;
            const radius = 0.12 + layer * 0.17;
            const petal = new THREE.Mesh(petals, flowerIndex === 2 ? paleMaterial : petalMaterial);
            petal.scale.set(0.25 + layer * 0.07, 0.38 + layer * 0.06, 0.09);
            petal.position.set(Math.sin(angle) * radius, Math.cos(angle) * radius, 0.25 - layer * 0.1);
            petal.rotation.set(0.2 * Math.cos(angle), 0.2 * Math.sin(angle), -angle);
            flower.add(petal);
          }
        }
        const stem = new THREE.Mesh(stems, stemMaterial);
        stem.position.y = -1.15;
        flower.add(stem);
        bouquet.add(flower);
      }
      bouquet.position.y = 0.35;
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let targetX = 0;
      let targetY = 0;
      const pointer = (event: PointerEvent) => {
        if (motion.matches) return;
        const bounds = element.getBoundingClientRect();
        targetY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.5;
        targetX = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.25;
      };
      const reset = () => { targetX = 0; targetY = 0; };
      const resize = () => {
        camera.aspect = element.clientWidth / Math.max(element.clientHeight, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(element.clientWidth, element.clientHeight);
      };
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      resize();
      element.addEventListener("pointermove", pointer);
      element.addEventListener("pointerleave", reset);
      let visible = true;
      const visibility = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; });
      visibility.observe(element);
      renderer.setAnimationLoop((time) => {
        if (!visible) return;
        if (!motion.matches) {
          bouquet.rotation.y += (targetY + Math.sin(time * 0.00035) * 0.1 - bouquet.rotation.y) * 0.04;
          bouquet.rotation.x += (targetX - bouquet.rotation.x) * 0.04;
        } else bouquet.rotation.set(0, 0, 0);
        renderer.render(scene, camera);
      });
      cleanup = () => {
        observer.disconnect();
        visibility.disconnect();
        element.removeEventListener("pointermove", pointer);
        element.removeEventListener("pointerleave", reset);
        renderer.setAnimationLoop(null);
        petals.dispose(); stems.dispose();
        petalMaterial.dispose(); paleMaterial.dispose(); stemMaterial.dispose();
        renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(() => {});
    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={host} className="floral-sculpture" aria-hidden="true" />;
}