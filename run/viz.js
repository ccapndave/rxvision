import Viz from '../viz/main'

function debounce(fn, time) {
  let last = null;
  let tout = null;
  return function check() {
    if (last === null || time < Date.now() - last) {
      clearTimeout(tout);
      last = Date.now();
      fn.call(this, arguments);
    } else {
      tout = setTimeout(check, time);
    }
  }
}

export default function main(tracer) {
  if (!tracer) {
    return console.warn('RxVision tracer not found');
  }

  let div = document.querySelector('[data-rxvision]');
  if (!div) {
    div = document.createElement('div');
    document.body.appendChild(div);
  }

  let viz = new Viz(div);
  // viz.process({streams: tracer.streams, groups: tracer.agroups})
  tracer.config.onValue = debounce(() => {
    viz.process({streams: tracer.streams, groups: tracer.agroups});
  }, 100)
}