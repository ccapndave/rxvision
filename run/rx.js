'use strict'

import wrap from '../wrap/rx'
import Tracer from '../lib/tracer'

export default function main(rx) {
  const tracer = new Tracer({
    //filterFiles: ['rx.all.js', 'rxvision.js'],
    onValue: function (entry, id) {
      // console.log('rxvision', entry.type, entry.value, id, entry)
    }
  });
  wrap(rx, tracer);

  window.txDump = () => {
    var t = document.createElement('textarea');
    t.value = JSON.stringify(tracer.dump());
    document.body.appendChild(t);
  };

  return tracer;
}