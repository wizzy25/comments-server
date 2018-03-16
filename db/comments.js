const comments = [
  {
    id: 1,
    user: 'John Doe',
    text: 'I really love auto generated clients'
  },
  {
    id: 2,
    user: 'James Franco',
    text: 'Me too, they save time'
  },
  {
    id: 3,
    user: 'Michael Jackson',
    text: 'The code is ugly and unreadable'
  },
  {
    id: 4,
    user: 'Florian Wolfgang',
    text: 'meh!'
  }
];

module.exports.getAllComments = () => comments;

module.exports.getComment = id => (
  comments.find(comment => (comment.id === parseInt(id))));

module.exports.getCommentsByUser = user => (
  comments.filter(comment => comment.user.toLowerCase() === user.toLowerCase()));

module.exports.setComment = comment => (
  comments.push(JSON.parse(JSON.stringify(comment))));
