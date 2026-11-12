// 反应链 · WebAudio 合成音效 / 背景音乐（无外部音频文件）
(function(){
  let ctx = null, master = null, bgmGain = null, muted = false;
  let bgmTimer = null, step = 0;

  function ensure(){
    if(ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.6;
    master.connect(ctx.destination);
    bgmGain = ctx.createGain();
    bgmGain.gain.value = 0.10;
    bgmGain.connect(master);
    return ctx;
  }

  function tone(freq, dur, type, gain, when, slideTo){
    if(!ensure() || muted) return;
    const t0 = ctx.currentTime + (when || 0);
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t0);
    if(slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(40, slideTo), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.15, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.03);
  }

  function noise(dur, gain, when, filterFreq){
    if(!ensure() || muted) return;
    const t0 = ctx.currentTime + (when || 0);
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for(let i=0;i<len;i++) d[i] = (Math.random()*2-1) * (1 - i/len);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = filterFreq || 1200; f.Q.value = 0.8;
    const g = ctx.createGain(); g.gain.value = gain || 0.2;
    src.connect(f); f.connect(g); g.connect(master);
    src.start(t0);
  }

  function bgmStep(){
    if(!ensure() || muted || !bgmGain) return;
    const chords = [
      [220.0, 277.18, 329.63],
      [196.0, 246.94, 293.66],
      [174.61, 220.0, 261.63],
      [196.0, 246.94, 329.63]
    ];
    const chord = chords[Math.floor(step/8) % chords.length];
    const n = chord[step % chord.length];
    const t0 = ctx.currentTime;
    [n/2, n, n*1.5].forEach((f,i)=>{
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = i===0 ? "sine" : "triangle";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(i===0 ? 0.035 : 0.014, t0 + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.85);
      o.connect(g); g.connect(bgmGain);
      o.start(t0); o.stop(t0 + 0.9);
    });
    step++;
  }

  const SFX = {
    enterGame(){
      ensure();
      if(ctx && ctx.state === "suspended") ctx.resume();
      if(!bgmTimer){
        bgmTimer = setInterval(bgmStep, 420);
      }
    },
    toggle(){
      muted = !muted;
      if(master) master.gain.value = muted ? 0 : 0.6;
      const b = document.getElementById("muteBtn");
      if(b) b.textContent = muted ? "🔇" : "🔊";
      return muted;
    },
    click(){ ensure(); tone(520, 0.05, "square", 0.035); },
    synth(){
      ensure();
      tone(320, 0.42, "triangle", 0.13, 0, 880);
      tone(640, 0.30, "sine", 0.09, 0.06, 1280);
      tone(960, 0.22, "sine", 0.06, 0.14);
      noise(0.18, 0.05, 0.02, 2600);
    },
    attack(){
      ensure();
      noise(0.22, 0.22, 0, 900);
      tone(180, 0.18, "sawtooth", 0.16, 0, 60);
      tone(520, 0.12, "square", 0.08, 0.02, 180);
    },
    claim(){
      ensure();
      [523.25, 659.25, 783.99, 1046.5].forEach((f,i)=>tone(f, 0.34, "sine", 0.11, i*0.07));
    },
    win(){ ensure(); [523.25,659.25,783.99,1046.5].forEach((f,i)=>tone(f,0.5,"triangle",0.12,i*0.1)); },
    lose(){ ensure(); tone(220,0.5,"sawtooth",0.12,0,110); tone(164.81,0.7,"sine",0.1,0.15,82); }
  };

  window.SFX = SFX;
  document.addEventListener("pointerdown", ()=>{ ensure(); if(ctx && ctx.state==="suspended") ctx.resume(); }, {once:true});
})();
