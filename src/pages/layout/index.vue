<template>
    <div>
        <h1> Container 布局容器</h1>
        <h2>用于布局的容器组件，方便快速搭建页面的基本结构：</h2>
        
        <ul style="font-size:2rem">
            <li> m-container：外层容器。当子元素中包含  m-header  或 m-footer 时，全部子元素会垂直上下排列，否则会水平左右排列。</li>
            <li>m-header：顶栏容器。</li>
            <li>m-aside：侧边栏容器。</li>
            <li>m-aside：主要区域容器。</li>
            <li>m-footer：底栏容器。</li>
        </ul>

        <p>以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，m-container 的子元素只能是后四者，后四者的父元素也只能是 m-container。</p>
        
        <h1>常见页面布局</h1>
        <div class="container-demo">
            <m-container>
                <m-header>header</m-header>
                <m-main>main</m-main>
            </m-container>

            <m-container>
                <m-header>header</m-header>
                <m-main>main</m-main>
                <m-footer>footer</m-footer>
            </m-container>

            <m-container>
                <m-main>main</m-main>
                <m-aside>aside</m-aside>  
            </m-container>
            <m-container>
                <m-aside>aside</m-aside>
                <m-main>main</m-main>  
            </m-container>

            <m-container>
                <m-header>header</m-header>
                <m-container>
                    <m-aside>aside</m-aside>
                    <m-main>main</m-main>
                </m-container> 
            </m-container>

            <m-container>
                <m-header>header</m-header>
                <m-container>
                    <m-aside>aside</m-aside>
                    <m-main>main</m-main>
                </m-container> 
                <m-footer>footer</m-footer>
            </m-container>

            <m-container>
                <m-header>header</m-header>
                <m-container>
                    <m-aside>aside</m-aside>
                    <m-container>
                        <m-main>main</m-main>
                        <m-footer>footer</m-footer>
                    </m-container>     
                </m-container> 
            </m-container>

            <m-container>
                <m-header>header</m-header>
                <m-container>
                    <m-container>
                        <m-main>main</m-main>
                        <m-footer>footer</m-footer>
                    </m-container>
                    <m-aside>aside</m-aside>     
                </m-container> 
            </m-container>  
        </div>
        
    </div>
</template>

<script>
export default {
    
}
</script>


<style scoped>
.container-demo>.m-container{
    margin-bottom: 40px;
}

.m-header,.m-aside,.m-main,.m-footer{
    font-size: 3rem;
    font-weight: bold;
    color: white;
}

.m-header,.m-footer{
    line-height: 60px;
    text-align: center;
}

.m-header{
    background-color: #2c3e50;
}

.m-footer{
     background-color: #bdc3c7;
}

.m-aside,.m-main{
    line-height: 200px;
    text-align: center;
}

.m-aside{
    background-color: #3498db;
}

.m-main{
    background-color: #2ecc71;
}
</style>