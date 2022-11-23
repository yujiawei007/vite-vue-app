<script setup>
// import Worker from "./worker?worker"
import { child } from '../assets/example.json'
import { ref } from 'vue'

console.log(child)

defineProps({
  msg: String
})

const count = ref(0)

const obj = ref({
  name: 'yu',
  age: 18
})

const btnName = ref('开始线程')

const makeWorker = () => {
    btnName.value = '运行中'
    // 获取计算开始的时间
    let start = performance.now()
    // 新建一个线程
    let worker = new Worker(new URL('./worker.js', import.meta.url).href)
    // 线程之间通过postMessage进行通信
    worker.postMessage(0)
    // 监听message事件
    worker.addEventListener("message", (e) => {
        // 关闭线程
        worker.terminate()
        // 获取计算结束的时间
        let end = performance.now()
        // 得到总的计算时间
        let durationTime = end - start
        console.log('计算结果:', e.data)
        console.log(`代码执行了 ${durationTime} 毫秒`)
        btnName.value = '开始线程'
    })
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <h1>{{ obj?.name }}</h1>

  <button @click="makeWorker">{{btnName}}</button>

  <!--在计算时 往input输入值时 没有发生卡顿-->
  <p><input type="text"></p>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
