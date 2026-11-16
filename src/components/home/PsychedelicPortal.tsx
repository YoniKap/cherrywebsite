"use client";

import { useEffect, useRef } from "react";

/**
 * A slowly morphing kaleidoscope of liquid colour bands with dark contour
 * lines, rendered by a tiny WebGL fragment shader. Purely decorative.
 *
 * Cheap by design: rendered at reduced resolution, capped to ~30fps, paused
 * when off-screen or in a background tab, and frozen on a single frame for
 * prefers-reduced-motion. Without WebGL the canvas simply stays empty.
 */

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r;
uniform float t;

vec3 band(float i){
  i = mod(i, 8.);
  if (i < 1.) return vec3(0.85, 0.20, 0.17);  // cherry
  if (i < 2.) return vec3(0.96, 0.52, 0.13);  // tangerine
  if (i < 3.) return vec3(0.95, 0.77, 0.20);  // mustard
  if (i < 4.) return vec3(0.42, 0.76, 0.24);  // acid green
  if (i < 5.) return vec3(0.95, 0.89, 0.79);  // bone
  if (i < 6.) return vec3(0.18, 0.58, 0.86);  // electric blue
  if (i < 7.) return vec3(0.48, 0.25, 0.78);  // violet
  return vec3(0.88, 0.20, 0.56);              // magenta
}

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5 * r) / min(r.x, r.y);
  float rad = length(p);

  // Kaleidoscope: fold the angle into mirrored wedges (the mandala symmetry)
  float seg = 6.28318 / 10.;
  float a = mod(atan(p.y, p.x) + t * 0.03 + rad * 3.2, seg); // spiral twist
  a = abs(a - seg * 0.5);
  vec2 q = vec2(cos(a), sin(a)) * rad;

  // Domain warp: the liquid, melting flow
  q += 0.16 * vec2(sin(4.0 * q.y + t * 0.35), cos(3.5 * q.x - t * 0.30));
  q += 0.07 * vec2(sin(9.0 * q.y - t * 0.50), cos(8.0 * q.x + t * 0.45));
  q += 0.03 * vec2(sin(19.0 * q.y + t * 0.7), cos(17.0 * q.x - t * 0.6));

  // Rings that breathe outward, bent by the warp
  float f = rad * 22.0 - t * 0.5
          + 4.5 * sin(q.x * 7.0 + t * 0.2) * cos(q.y * 6.0 - t * 0.17)
          + 2.2 * sin(length(q) * 20.0 - t * 0.6)
          + 1.5 * sin(q.x * 23.0 - q.y * 19.0 + t * 0.3);

  float id = floor(f);
  float b = fract(f);
  vec3 col = band(id);

  // Dark ink contours between bands, with a soft inner shade like a poster print
  float edge = smoothstep(0.0, 0.1, b) * smoothstep(1.0, 0.9, b);
  col *= mix(0.08, 1.0, edge);
  col *= 0.82 + 0.18 * sin(b * 3.14159);

  // Fine fractal filaments inside each band
  float fil = sin((q.x * 40.0 + q.y * 31.0) + b * 12.0 + t * 0.4);
  col *= 0.9 + 0.1 * fil;

  // Fade to transparent at the rim so it melts into the page
  float alpha = smoothstep(0.5, 0.3, rad);
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export function PsychedelicPortal({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "r");
    const uTime = gl.getUniformLocation(prog, "t");

    // Soft by nature, so render at a fraction of the CSS size
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio, 1) * 0.75;
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = performance.now() - 40_000; // start mid-flow, not at t=0
    let raf = 0;
    let last = 0;
    let visible = true;

    const draw = (now: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return; // ~30fps is plenty for a slow drift
      last = now;
      draw(now);
    };
    const update = () => {
      cancelAnimationFrame(raf);
      if (reduced.matches) draw(performance.now());
      else if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      update();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", update);
    update();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
