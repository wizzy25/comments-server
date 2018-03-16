const users = [
    { username: 'jamesfranco', password: 'secret', displayName: 'James Franco' }
  , { username: 'johndoe', password: 'birthday', displayName: 'John Doe' }
  , { username: 'michaeljackson', password: 'keyword', displayName: 'Michael Jackson' }
  , { username: 'florianwolfgang', password: 'hidden', displayName: 'Florian Wolfgang' }
];

module.exports.getUser = (userString) => users.find(user => `${user.username}:${user.password}` === userString);
