const items = [
  {
    key: 'SSRrZTgFqM',
    name: 'Green',
    times: [10, 20, 30]
  }, {
    key: 'agPz2M9fl3',
    name: 'Black',
    times: [20, 45, 60, 80]
  }, {
    key: '3HSoYQ0t4H',
    name: 'Oolong',
    times: [20, 45, 60]
  }, {
    key: '7ipaQpHGk0',
    name: 'PuErh',
    times: [20, 45, 60]
  },
];

class TeaRepository {

  static getItems() {
    return items
  }

  static getItem(key) {
    return items.find(item => item.key === key);
  }

}

export default TeaRepository;
