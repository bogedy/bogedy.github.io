(()=>{"use strict";var e,t,r,n,l={927:(e,t,r)=>{r.a(e,(async(e,t)=>{try{const r=32,n=document.querySelector("canvas");if(!navigator.gpu)throw new Error("WebGPU not supported on this browser.");console.log("WebGPU is supported!");const l=await navigator.gpu.requestAdapter();if(!l)throw new Error("No appropriate GPUAdapter found.");const i=await l.requestDevice(),a=n.getContext("webgpu"),o=navigator.gpu.getPreferredCanvasFormat(),u=new Float32Array([-.8,-.8,.8,-.8,.8,.8,-.8,-.8,.8,.8,-.8,.8]),c=i.createBuffer({label:"Cell vertices",size:u.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});i.queue.writeBuffer(c,0,u);const s={arrayStride:8,attributes:[{format:"float32x2",offset:0,shaderLocation:0}]},f=new Uint32Array(r*r),d=[i.createBuffer({label:"Cell State A",size:f.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),i.createBuffer({label:"Cell State B",size:f.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})];for(let _=0;_<f.length;_++)f[_]=Math.random()>.6?1:0;i.queue.writeBuffer(d[0],0,f);for(let B=0;B<f.length;B++)f[B]=B%2;i.queue.writeBuffer(d[1],0,f);const p=i.createShaderModule({label:"Cell shader",code:"\n\n    @group(0) @binding(0) var<uniform> grid: vec2<f32>;\n    @group(0) @binding(1) var<storage> cellState: array<u32>;\n\n    struct VertexInput {\n      @location(0) pos: vec2<f32>,\n      @builtin(instance_index) instance: u32,\n    };\n\n    struct VertexOutput {\n      @builtin(position) pos: vec4<f32>,\n      @location(0) cell: vec2f,\n    };\n\n    @vertex\n    fn vertexMain(input: VertexInput) -> VertexOutput {\n      \n      let i = f32(input.instance);\n      let cell = vec2f(i % grid.x, floor(i / grid.x));\n      let state = f32(cellState[input.instance]);\n\n      let cellOffset = cell / grid * 2;\n      let gridPos = (input.pos*state + 1) / grid - 1 + cellOffset;\n\n      var output: VertexOutput;\n      output.pos = vec4f(gridPos, 0, 1);\n      output.cell = cell;\n      return output;\n    }\n\n    @fragment\n    fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {\n      let c = input.cell / grid;\n      return vec4f(1-c.x, c, .5);\n}\n  "}),g=i.createBindGroupLayout({label:"Cell Bind Group Layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.COMPUTE|GPUShaderStage.FRAGMENT,buffer:{}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),b=i.createPipelineLayout({label:"Cell Pipeline Layout",bindGroupLayouts:[g]}),v=i.createRenderPipeline({label:"Cell pipeline",layout:b,vertex:{module:p,entryPoint:"vertexMain",buffers:[s]},fragment:{module:p,entryPoint:"fragmentMain",targets:[{format:o}]}}),y=new Float32Array([r,r]),h=i.createBuffer({label:"Grid Uniforms",size:y.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});i.queue.writeBuffer(h,0,y);const x=[i.createBindGroup({label:"Cell renderer bind group A",layout:g,entries:[{binding:0,resource:{buffer:h}},{binding:1,resource:{buffer:d[0]}},{binding:2,resource:{buffer:d[1]}}]}),i.createBindGroup({label:"Cell renderer bind group B",layout:v.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:h}},{binding:1,resource:{buffer:d[1]}},{binding:2,resource:{buffer:d[0]}}]})];a.configure({device:i,format:o});const m=200;let S=0;function P(){const e=i.createCommandEncoder(),t=e.beginComputePass();t.setPipeline(G),t.setBindGroup(0,x[S%2]);const n=Math.ceil(r/w);t.dispatchWorkgroups(n,n),t.end(),S++;const l=e.beginRenderPass({colorAttachments:[{view:a.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:0,g:.4,b:.4,a:1},storeOp:"store"}]});l.setPipeline(v),l.setVertexBuffer(0,c),l.setBindGroup(0,x[S%2]),l.draw(u.length/2,r*r),l.end();const o=e.finish();i.queue.submit([o])}const w=8,U=i.createShaderModule({label:"Game of Life simulation shader",code:`\n    @group(0) @binding(0) var<uniform> grid: vec2f;\n    @group(0) @binding(1) var<storage> cellStateIn: array<u32>;\n    @group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;\n\n    fn cell_index(cell: vec2u) -> u32 {\n      return (cell.y % u32(grid.y)) * u32(grid.x) + (cell.x % u32(grid.x));\n    }\n\n    fn cellActive(x: u32, y: u32) -> u32 {\n      return cellStateIn[cell_index(vec2(x, y))];\n    }\n\n    @compute\n    @workgroup_size(${w}, ${w})\n    fn computeMain(@builtin(global_invocation_id) cell: vec3u) {\n\n      let activeNeighbors = cellActive(cell.x+1, cell.y+1) +\n                        cellActive(cell.x+1, cell.y) +\n                        cellActive(cell.x+1, cell.y-1) +\n                        cellActive(cell.x, cell.y-1) +\n                        cellActive(cell.x-1, cell.y-1) +\n                        cellActive(cell.x-1, cell.y) +\n                        cellActive(cell.x-1, cell.y+1) +\n                        cellActive(cell.x, cell.y+1);\n\n      let i = cell_index(cell.xy);\n      switch activeNeighbors {\n        case 2: { // Active cells with 2 neighbors stay active.\n          cellStateOut[i] = cellStateIn[i];\n        }\n        case 3: { // Cells with 3 neighbors become or stay active.\n          cellStateOut[i] = 1;\n        }\n        default: { // Cells with < 2 or > 3 neighbors become inactive.\n          cellStateOut[i] = 0;\n        }\n      }\n    }`}),G=i.createComputePipeline({label:"Simulation pipeline",layout:b,compute:{module:U,entryPoint:"computeMain"}});setInterval(P,m),t()}catch(C){t(C)}}),1)}},i={};function a(e){var t=i[e];if(void 0!==t)return t.exports;var r=i[e]={exports:{}};return l[e](r,r.exports,a),r.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",r="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",n=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},a.a=(l,i,a)=>{var o;a&&((o=[]).d=-1);var u,c,s,f=new Set,d=l.exports,p=new Promise(((e,t)=>{s=t,c=e}));p[t]=d,p[e]=e=>(o&&e(o),f.forEach(e),p.catch((e=>{}))),l.exports=p,i((l=>{var i;u=(l=>l.map((l=>{if(null!==l&&"object"==typeof l){if(l[e])return l;if(l.then){var i=[];i.d=0,l.then((e=>{a[t]=e,n(i)}),(e=>{a[r]=e,n(i)}));var a={};return a[e]=e=>e(i),a}}var o={};return o[e]=e=>{},o[t]=l,o})))(l);var a=()=>u.map((e=>{if(e[r])throw e[r];return e[t]})),c=new Promise((t=>{(i=()=>t(a)).r=0;var r=e=>e!==o&&!f.has(e)&&(f.add(e),e&&!e.d&&(i.r++,e.push(i)));u.map((t=>t[e](r)))}));return i.r?c:a()}),(e=>(e?s(p[r]=e):c(d),n(o)))),o&&o.d<0&&(o.d=0)},a(927)})();
//# sourceMappingURL=main.js.map