import { helper } from '@ember/component/helper';

function getdomainurl([string]) {
  return string.split('/')[2];
}

export default helper(getdomainurl);