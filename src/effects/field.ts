import { FRAG, VERT } from "./heroShader";

export interface FieldUniforms {
  time: number;
  light: [number, number]; // canvas pixels, y up
  radius: number; // canvas pixels
  base: number;
  out: number;
}

export interface Field {
  width: number;
  height: number;
  resize(): void;
  render(u: FieldUniforms): void;
}

/* One WebGL1 program drawing the dithered field on a full-screen triangle.
   Shared by the hero and the loader. Returns null (never throws) when the
   context or shaders are unavailable, so callers can fall back. The context
   is deliberately never released: StrictMode re-runs effects on the same
   canvas, and a lost context cannot compile shaders. */
export function createField(canvas: HTMLCanvasElement, opts: { alpha: boolean; scale: number }): Field | null {
  let gl: WebGLRenderingContext | null = null;
  try {
    gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: opts.alpha,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
  } catch {
    gl = null;
  }
  if (!gl) return null;
  const ctx = gl;

  const compile = (type: number, src: string): WebGLShader | null => {
    const sh = ctx.createShader(type);
    if (!sh) return null;
    ctx.shaderSource(sh, src);
    ctx.compileShader(sh);
    if (!ctx.getShaderParameter(sh, ctx.COMPILE_STATUS)) {
      console.warn("field shader:", ctx.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  };
  const vs = compile(ctx.VERTEX_SHADER, VERT);
  const fs = compile(ctx.FRAGMENT_SHADER, FRAG);
  const prog = ctx.createProgram();
  if (!vs || !fs || !prog) return null;
  ctx.attachShader(prog, vs);
  ctx.attachShader(prog, fs);
  ctx.linkProgram(prog);
  if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) {
    console.warn("field program:", ctx.getProgramInfoLog(prog));
    return null;
  }
  ctx.useProgram(prog);

  const buf = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, buf);
  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), ctx.STATIC_DRAW);
  const aPos = ctx.getAttribLocation(prog, "a_pos");
  ctx.enableVertexAttribArray(aPos);
  ctx.vertexAttribPointer(aPos, 2, ctx.FLOAT, false, 0, 0);
  if (opts.alpha) {
    ctx.enable(ctx.BLEND);
    ctx.blendFunc(ctx.ONE, ctx.ONE_MINUS_SRC_ALPHA);
  }

  const u = {
    res: ctx.getUniformLocation(prog, "u_res"),
    time: ctx.getUniformLocation(prog, "u_time"),
    light: ctx.getUniformLocation(prog, "u_light"),
    radius: ctx.getUniformLocation(prog, "u_radius"),
    base: ctx.getUniformLocation(prog, "u_base"),
    out: ctx.getUniformLocation(prog, "u_out"),
  };

  const field: Field = {
    width: 1,
    height: 1,
    resize() {
      const r = canvas.getBoundingClientRect();
      field.width = Math.max(1, Math.floor(r.width / opts.scale));
      field.height = Math.max(1, Math.floor(r.height / opts.scale));
      canvas.width = field.width;
      canvas.height = field.height;
      ctx.viewport(0, 0, field.width, field.height);
    },
    render(v) {
      ctx.uniform2f(u.res, field.width, field.height);
      ctx.uniform1f(u.time, v.time);
      ctx.uniform2f(u.light, v.light[0], v.light[1]);
      ctx.uniform1f(u.radius, v.radius);
      ctx.uniform1f(u.base, v.base);
      ctx.uniform1f(u.out, v.out);
      if (opts.alpha) {
        ctx.clearColor(0, 0, 0, 0);
        ctx.clear(ctx.COLOR_BUFFER_BIT);
      }
      ctx.drawArrays(ctx.TRIANGLES, 0, 3);
    },
  };
  field.resize();
  return field;
}
