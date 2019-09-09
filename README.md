# typescript-redux
用typescript重写了redux源码，功能是一样的，仅供一起参考学习，不作为商业用途。

# 介绍项目里几个文件的内容：
index.ts: 暴露了对外使用的几个接口
          createStore--该函数创建一个store，入参为reducer函数的对象,返回的store是唯一的,store的创建源码可以看createStore.ts文件
          combineReducers--该函数创建一个reducer函数，供dispatch调用，实现的源码在combinereducers.ts文件
          bindActionCreators--该函数会将你定义的action变成一个dipacth动作。
          
createStore.ts:该文件内容包括store的创建，以及store里包含的几个函数
combineReducers.ts：该文件为创建reducer
bindActionCreators:该文件将你的action对象变成一个dispacth动作
applyMiddleware.ts:该文件是提供中间件功能，里面利用了数组的reduce函数，制作高阶柯里化函数体，能看懂这部分的人，说明逻辑思维能力很好

# 结束
该源码也是一边参考redux，在已经理解的基础上，进行重写，也是想对typescript的一个熟悉和记忆。        
