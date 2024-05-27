<template>
    <div class="clock">
        <div class="formatter_area">
            <div class="formatter time_formatter">
                <label class="mr-10" for="timeFormat">Time Format:</label>
                <select id="timeFormat" v-model="state.format.timeFormat">
                    <option v-for="timeFormat in timeFormats" :value="timeFormat.value">{{ timeFormat.label }}</option>
                </select>
            </div>
            <div class="formatter date_formatter">
                <label class="mr-10" for="dateFormat">Date Format:</label>
                <select id="dateFormat" v-model="state.format.dateFormat">
                    <option v-for="dateFormat in dateFormats" :value="dateFormat">{{ dateFormat }}</option>
                </select>
            </div>
        </div>
        <div class="clock_area">
            <p class="date">
                {{ state.date }}
            </p>
            <p class="time">
                {{ state.time }}
            </p>
            <p class="text">DIGITAL CLOCK with Vue.js</p>
        </div>
    </div>
</template>

<script setup>
import {onMounted, onUnmounted, reactive, watch} from "vue";
import {
    dateFormats,
    timeFormats,
    getFormattedDate,
    getFormattedTime,
    Storage
} from "../utils/helpers.js";

const state = reactive({
    date: '',
    time: '',

    format: {
        timeFormat: '12h',
        dateFormat: 'YYYY/MM/DD'
    }
});

const updateTime = () => {
    const now = new Date();
    state.time = getFormattedTime(now, state.format.timeFormat);
    state.date = getFormattedDate(now, state.format.dateFormat);
}

let timerId = setInterval(updateTime, 1000);

const setFormats = () => {
    const formats = Storage.get('clock');

    if (formats) {
        state.format = formats;
    }
}

watch(() => state.format, (nv) => {
    updateTime();
    Storage.set('clock', nv);
}, {deep: true});

onMounted(() => {
    setFormats();
    updateTime();

    window.document.title = 'Digital Clock';
});

onUnmounted(() => {
    clearInterval(timerId);
});
</script>

<style scoped>

</style>
