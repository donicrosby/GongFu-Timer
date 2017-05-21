import store from 'store';
import shortid from 'shortid';

const KEY = 'teas';

const EXAMPLE = {
  name: 'Example',
  times: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
  order: 1,
};

const TeaRepository = {
  get: key => {
    const teas = getTeas();
    return teas[key];
  },

  getAll: () => {
    const teas = getTeas();
    return Object.values(teas).sort(item => item.order);
  },

  set: value => {
    if (!value.key) {
      value.key = shortid.generate();
    }
    let teas = getTeas();
    teas[value.key] = value;
    return setTeas(teas);
  },

  delete: key => {
    let teas = getTeas();
    delete teas[key];
    return setTeas(teas);
  }
};

function getTeas() {
  let teas = store.get(KEY);

  if (teas instanceof Object) {
    return teas;
  }

  setTeas({});
  TeaRepository.set(EXAMPLE);
  return getTeas();
}

function setTeas(teas) {
  return store.set(KEY, teas);
}

export default TeaRepository;
