---
title: "Game of Life WebGPU Codelab"
date: 2024-05-05T00:06:49Z
draft: false
---

This is running on your GPU! Each updated cell is computed in parallel.

You may need to enable WebGPU in your browser, see compatibility [here](https://caniuse.com/?search=webgpu).

<style>
  canvas {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
    border: 1px solid #ccc;
  }
  
  .controls {
    text-align: center;
    margin-top: 10px;
    font-family: Arial, sans-serif;
  }
  
  .controls input[type="range"] {
    width: 200px;
    margin: 0 10px;
  }
</style>

<canvas width="2048" height="2048"></canvas>
    <script src="/assets/life_gpu/main.js"></script>
    <div class="controls">
      Updates per second
      <input type="range" id="speedSlider" min="1" max="60" step="1" value="5">
      <span id="speedValue">5</span><br>
      Size
      <input type="range" id="sizeSlider" min="8" max="512" step="8" value="32">
      <span id="sizeValue">32</span><br>
      <button id="restartBtn">Restart with new size</button>
    </div>
