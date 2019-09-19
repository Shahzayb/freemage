module.exports = function generateSrcset(breakpoints) {
  let srcset = '';
  for (let breakpoint of breakpoints) {
    srcset += breakpoint.secure_url + ` ${breakpoint.width}w,`;
  }
  srcset = srcset.replace(/,$/, '');
  return srcset;
};
