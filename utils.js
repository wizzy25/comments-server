module.exports.validate =  (allComments, comment) => {
  if (typeof comment !== 'object')
    return { valid: false, message: 'Invalid type' };
  const { id, user, text } = comment;

  if (typeof id !== 'number' || typeof user !== 'string' || typeof text !== 'string')
    return { valid: false, message: 'Invalid comment' };

  return allComments.find(comment => comment.id === id)
    ? { valid: false, message: 'Comment with same id already exists' }
    : { valid: true, message: 'OK' };
}
