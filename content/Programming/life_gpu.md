---
title: "Game of Life WebGPU Codelab"
date: 2024-05-05T00:06:49Z
draft: false
---

Just serving the results of this Google [Codelab](https://codelabs.developers.google.com/your-first-webgpu-app). Starts with a random layout on each refresh. The compute and shading is all done on your GPU! Each active square is made up of two triangles. [Source code](https://github.com/bogedy/webgpu_codelab).

# !!!As of today it will only work in Chrome based browsers!!! 
Desktop Safari and Firefox support WebGPU with a flag switch and most mobile browsers don't support it yet. See support [here](https://caniuse.com/?search=webgpu).

<link rel="stylesheet" type="text/css" href="/assets/rust_snake/style.css">

<canvas width="512" height="512"></canvas>

<script type="module" src="/assets/life_gpu/main.js"></script>
