module.exports = async (ctx, next) => {
  const req = ctx.request
  ctx.ok = (data) => ({
    api: req.header.host + req.url.match(/([\/\-\w]+)\??/)[1],
    version: req.url.match(/([\/\-\w]+)\??/)[1],
    data: data,
    ret: 'success::调用成功',
    timestamp: new Date().getTime(),
  })

  ctx.forbidden = () => ({
    api: req.header.host + req.url,
    version: req.url.match(/\/(.*)\//)[1],
    ret: 'success::无接口调用权限',
    timestamp: new Date().getTime(),
  })
  ctx.error = (error) => {
    if(process.env.NODE_ENV === 'local'){
      ctx.status = 500;
      ctx.body = error.message
    }else{
      ctx.body = "some error~ please concat admin"
    }
  }

  await next()
}
