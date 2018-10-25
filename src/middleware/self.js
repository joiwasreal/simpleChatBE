module.exports = () => async (ctx, next) => {
  if (`${ctx.params.id}` === `${ctx.user.id}`) {
    return next()
  }

  ctx.throw(403)
}
