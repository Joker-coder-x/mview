<template>
  <div>
    <m-mind width="1000px" height="600px" :data="data"></m-mind>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        centralNode: {
          name: "兰陵王",
          key: "01",
          children: [
            {
              name: "程咬金",
              key: "02",
              children: [
                {
                  name: "王昭君",
                  key: "05"
                },
                {
                  name: "甄姬",
                  key: "06",
                  children: [
                    {
                      name: "典韦"
                    },
                    {
                      name: "橘右京"
                    }
                  ]
                }
              ]
            },
            {
              name: "鲁班",
              key: "03"
            },
            {
              name: "迪迦",
              key: "04"
            }
          ]
        }
      }
    };
  }
};
</script>
