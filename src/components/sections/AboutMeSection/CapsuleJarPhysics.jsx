"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Matter from "matter-js";
import styles from "./AboutMeSection.module.scss";

/**
 * CapsuleJarPhysics
 * Interactive 2D physics "Jar" of skill capsules.
 * - Initial state: Capsules float elegantly in their curated design arrangement over the portrait.
 * - Grab interaction: Pointer down connects a Matter.js physical constraint, allowing direct 1:1 dragging.
 * - Dynamic collisions: Sweeping the grabbed capsule through the container physically knocks and scatters other capsules.
 * - Release ("leave it"): Drops with gravity and toss momentum onto other capsules or the jar floor, stacking naturally.
 * - Reset Jar button: Smoothly lerps all capsules back to their starting layout and resets gravity.
 */
const CapsuleJarPhysics = ({ capsules = [] }) => {
  const containerRef = useRef(null);
  const elementsRef = useRef({});
  const resetBtnRef = useRef(null);
  const engineRef = useRef(null);
  const bodiesRef = useRef({});
  const wallsRef = useRef([]);
  const animFrameIdRef = useRef(null);
  const isInteractedRef = useRef(false);
  const activeConstraintRef = useRef(null);
  const isResettingRef = useRef(false);
  const capsulesRef = useRef(capsules);
  capsulesRef.current = capsules;

  // Drag tracking state
  const dragRef = useRef({
    active: false,
    capsuleId: null,
    body: null,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    vx: 0,
    vy: 0,
  });

  // Activate gravity and physics simulation upon first user grab
  const activateJarPhysics = useCallback(() => {
    if (!isInteractedRef.current && engineRef.current) {
      isInteractedRef.current = true;
      engineRef.current.gravity.y = 1.25; // Natural gravity pulls capsules down to stack
      if (resetBtnRef.current) {
        resetBtnRef.current.classList.add(styles.visible);
      }
    }
  }, []);

  // Smooth Reset Handler: Lerps all capsules back to starting positions
  const handleReset = useCallback(() => {
    const { Body, Composite } = Matter;
    const engine = engineRef.current;
    if (!engine) return;

    // Release any active grab constraint immediately
    if (activeConstraintRef.current) {
      Composite.remove(engine.world, activeConstraintRef.current);
      activeConstraintRef.current = null;
    }
    dragRef.current.active = false;
    dragRef.current.body = null;

    // Turn off gravity while resetting
    engine.gravity.y = 0;
    isResettingRef.current = true;

    // Remove dragging class from all capsule DOM elements
    Object.values(elementsRef.current).forEach((el) => {
      if (el) el.classList.remove(styles.isDragging);
    });

    // Hide reset button
    if (resetBtnRef.current) {
      resetBtnRef.current.classList.remove(styles.visible);
    }
  }, []);

  // Direct grab trigger attached to each capsule
  const handleCapsulePointerDown = useCallback(
    (capsuleId, e) => {
      // Only handle primary button (left click / touch)
      if (e.button !== undefined && e.button !== 0) return;

      e.preventDefault();
      e.stopPropagation();

      const container = containerRef.current;
      const body = bodiesRef.current[capsuleId];
      const engine = engineRef.current;
      if (!container || !body || !engine) return;

      activateJarPhysics();
      isResettingRef.current = false;

      const { Constraint, Composite, Sleeping } = Matter;
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Remove any prior constraint
      if (activeConstraintRef.current) {
        Composite.remove(engine.world, activeConstraintRef.current);
        activeConstraintRef.current = null;
      }

      // Offset from body center for natural pivot point
      const localOffset = {
        x: mouseX - body.position.x,
        y: mouseY - body.position.y,
      };

      // Create elastic Matter.js constraint connecting mouse cursor to capsule
      const constraint = Constraint.create({
        pointA: { x: mouseX, y: mouseY },
        bodyB: body,
        pointB: localOffset,
        stiffness: 0.95,
        damping: 0.05,
        length: 0,
        render: { visible: false },
      });

      Composite.add(engine.world, constraint);
      activeConstraintRef.current = constraint;
      Sleeping.set(body, false);

      dragRef.current = {
        active: true,
        capsuleId,
        body,
        lastX: mouseX,
        lastY: mouseY,
        lastTime: performance.now(),
        vx: 0,
        vy: 0,
      };

      const el = elementsRef.current[capsuleId];
      if (el) {
        el.classList.add(styles.isDragging);
        el.style.zIndex = "80";
      }

      if (e.currentTarget && e.currentTarget.setPointerCapture && e.pointerId) {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch (_) {}
      }
    },
    [activateJarPhysics]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { Engine, Bodies, Body, Composite } = Matter;

    // 1. Create Engine with 0 initial gravity (capsules stay in pristine starting layout)
    const engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0.001 },
      enableSleeping: false,
    });
    engineRef.current = engine;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 2. Invisible Boundary Walls of the Jar
    const wallThickness = 120;
    const wallOptions = {
      isStatic: true,
      restitution: 0.35,
      friction: 0.3,
      render: { visible: false },
    };

    // Ground (Jar floor)
    const ground = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2 - 2,
      width * 2,
      wallThickness,
      wallOptions
    );
    // Ceiling
    const ceiling = Bodies.rectangle(
      width / 2,
      -wallThickness / 2 + 2,
      width * 2,
      wallThickness,
      wallOptions
    );
    // Left Wall
    const leftWall = Bodies.rectangle(
      -wallThickness / 2 + 2,
      height / 2,
      wallThickness,
      height * 2,
      wallOptions
    );
    // Right Wall
    const rightWall = Bodies.rectangle(
      width + wallThickness / 2 - 2,
      height / 2,
      wallThickness,
      height * 2,
      wallOptions
    );

    wallsRef.current = [ground, ceiling, leftWall, rightWall];
    Composite.add(engine.world, wallsRef.current);

    // 3. Create Dynamic Rigid Bodies for each Capsule
    const currentCapsules = capsulesRef.current;
    const bodies = {};
    currentCapsules.forEach((capsule) => {
      const el = elementsRef.current[capsule.id];
      const capsuleWidth = el?.offsetWidth || 168;
      const capsuleHeight = el?.offsetHeight || 56;
      const radius = capsuleHeight / 2;

      const topPct = parseFloat(capsule.top) / 100;
      const leftPct = parseFloat(capsule.left) / 100;
      const initialX = leftPct * width + capsuleWidth / 2;
      const initialY = topPct * height + capsuleHeight / 2;
      const initialAngle = (parseFloat(capsule.rotate) * Math.PI) / 180 || 0;

      const body = Bodies.rectangle(initialX, initialY, capsuleWidth, capsuleHeight, {
        chamfer: { radius },
        restitution: 0.35, // realistic bounce
        friction: 0.35, // natural stacking friction
        frictionAir: 0.015,
        density: 0.003,
        angle: initialAngle,
        isStatic: false,
      });

      body.capsuleId = capsule.id;
      body.initialState = { x: initialX, y: initialY, angle: initialAngle };
      bodies[capsule.id] = body;
      Composite.add(engine.world, body);

      // Initial DOM placement
      if (el) {
        const halfW = capsuleWidth / 2;
        const halfH = capsuleHeight / 2;
        const x = initialX - halfW;
        const y = initialY - halfH;
        const deg = parseFloat(capsule.rotate) || 0;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
      }
    });

    bodiesRef.current = bodies;

    // 4. Stable Fixed-Timestep Physics & DOM Sync Loop
    const updatePhysics = () => {
      if (engineRef.current) {
        // If resetting back to formation, smoothly lerp bodies to their target initial states
        if (isResettingRef.current) {
          let allSettled = true;
          currentCapsules.forEach((capsule) => {
            const body = bodiesRef.current[capsule.id];
            if (body && body.initialState) {
              const dx = body.initialState.x - body.position.x;
              const dy = body.initialState.y - body.position.y;
              const da = body.initialState.angle - body.angle;

              if (Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4 || Math.abs(da) > 0.01) {
                allSettled = false;
                Body.setPosition(body, {
                  x: body.position.x + dx * 0.14,
                  y: body.position.y + dy * 0.14,
                });
                Body.setAngle(body, body.angle + da * 0.14);
                Body.setVelocity(body, { x: 0, y: 0 });
                Body.setAngularVelocity(body, 0);
              } else {
                Body.setPosition(body, { x: body.initialState.x, y: body.initialState.y });
                Body.setAngle(body, body.initialState.angle);
                Body.setVelocity(body, { x: 0, y: 0 });
                Body.setAngularVelocity(body, 0);
              }
            }
          });

          if (allSettled) {
            isResettingRef.current = false;
            isInteractedRef.current = false;
          }
        } else {
          // Standard physics tick with fixed 16.666ms timestep
          Engine.update(engineRef.current, 1000 / 60);
        }

        // Synchronize DOM transforms from physics body positions
        currentCapsules.forEach((capsule) => {
          const body = bodiesRef.current[capsule.id];
          const el = elementsRef.current[capsule.id];
          if (body && el) {
            const halfW = (el.offsetWidth || 168) / 2;
            const halfH = (el.offsetHeight || 56) / 2;
            const x = body.position.x - halfW;
            const y = body.position.y - halfH;
            const deg = (body.angle * 180) / Math.PI;

            el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
          }
        });
      }

      animFrameIdRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameIdRef.current = requestAnimationFrame(updatePhysics);

    // 5. Container Resize Observer to update boundary walls
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      const [ground, ceiling, leftWall, rightWall] = wallsRef.current;
      if (ground) Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 58 });
      if (ceiling) Body.setPosition(ceiling, { x: newWidth / 2, y: -58 });
      if (leftWall) Body.setPosition(leftWall, { x: -58, y: newHeight / 2 });
      if (rightWall) Body.setPosition(rightWall, { x: newWidth + 58, y: newHeight / 2 });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 6. Direct Pointer Move & Release Listeners
    const handlePointerMove = (e) => {
      if (!dragRef.current.active || !activeConstraintRef.current) return;

      const rect = container.getBoundingClientRect();
      const halfW = 84;
      const halfH = 28;

      // Constrain within the jar walls
      const clampedX = Math.max(halfW, Math.min(rect.width - halfW, e.clientX - rect.left));
      const clampedY = Math.max(halfH, Math.min(rect.height - halfH, e.clientY - rect.top));

      const now = performance.now();
      const dt = Math.max(1, now - dragRef.current.lastTime);
      const vx = ((clampedX - dragRef.current.lastX) / dt) * 16.66;
      const vy = ((clampedY - dragRef.current.lastY) / dt) * 16.66;

      dragRef.current.vx = vx;
      dragRef.current.vy = vy;
      dragRef.current.lastX = clampedX;
      dragRef.current.lastY = clampedY;
      dragRef.current.lastTime = now;

      // Update constraint target point — Matter.js pulls the body with physical force!
      activeConstraintRef.current.pointA = { x: clampedX, y: clampedY };
    };

    const handlePointerUp = () => {
      if (!dragRef.current.active) return;

      const { body, capsuleId, vx, vy } = dragRef.current;
      dragRef.current.active = false;
      dragRef.current.body = null;

      // Detach constraint
      if (activeConstraintRef.current && engineRef.current) {
        Composite.remove(engineRef.current.world, activeConstraintRef.current);
        activeConstraintRef.current = null;
      }

      // Impart toss momentum on release — drops under gravity onto other capsules!
      if (body) {
        const tossX = Math.max(-22, Math.min(22, vx * 0.75));
        const tossY = Math.max(-22, Math.min(22, vy * 0.75));
        Body.setVelocity(body, { x: tossX, y: tossY });
      }

      const el = elementsRef.current[capsuleId];
      if (el) {
        el.classList.remove(styles.isDragging);
        setTimeout(() => {
          const orig = capsulesRef.current.find((c) => c.id === capsuleId);
          if (orig && el) {
            el.style.zIndex = String(orig.zIndex || 10);
          }
        }, 300);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    // Global testing hooks for automated verification
    if (typeof window !== "undefined") {
      window.__triggerCapsuleDrop = (id, targetX, targetY) => {
        activateJarPhysics();
        const body = bodiesRef.current[id || "nextjs"];
        if (body) {
          Body.setPosition(body, { x: targetX || 250, y: targetY || 60 });
          Body.setVelocity(body, { x: 2, y: 0 });
        }
      };
      window.__resetCapsuleJar = handleReset;
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [activateJarPhysics, handleReset]); // Stable deps

  return (
    <div
      ref={containerRef}
      className={styles.physicsJarContainer}
      aria-label="Interactive skill capsules jar. Grab and toss skills."
    >
      {/* Skill Capsules with direct grab triggers */}
      {capsules.map((capsule) => (
        <div
          key={capsule.id}
          ref={(node) => {
            if (node) elementsRef.current[capsule.id] = node;
          }}
          className={`${styles.capsule} ${styles[capsule.theme]} ${styles.physicsPill}`}
          style={{ zIndex: capsule.zIndex || 10 }}
          data-capsule-id={capsule.id}
          onPointerDown={(e) => handleCapsulePointerDown(capsule.id, e)}
        >
          <span>{capsule.name}</span>
        </div>
      ))}

      {/* Floating Reset Button */}
      <button
        ref={resetBtnRef}
        type="button"
        onClick={handleReset}
        className={styles.resetJarBtn}
        title="Reset capsules to formation"
        aria-label="Reset capsules"
      >
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        <span>Reset Jar</span>
      </button>
    </div>
  );
};

export default CapsuleJarPhysics;
