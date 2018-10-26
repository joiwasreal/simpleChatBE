module.exports = () => async (ctx, next) => {
  if (`${ctx.params.userId}` === `${ctx.user.id}`) {
    return next()
  }

  ctx.throw(403)
}
