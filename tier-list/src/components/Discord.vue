<template>
    <h2 id="title">{{ serverName }}</h2>


    <div id="list-members" class="sort ui-sortable" style="padding-top:25px;">
            <img v-for="image in Object.keys(images)"
                :alt="image"
                :src="images[image]"
            >
    </div>
</template>

<script>
    import Sortable from 'sortablejs'
    import image1 from "../assets/images/1.png"
    import image2 from "../assets/images/2.png"
    import image3 from "../assets/images/3.png"

    export default {
        data() {
            return {
                serverName: 'Saucydogs',
                project: 'default',
                listName: 'List',
                images: {image1, image2, image3}
            }
        },
        
        mounted: function() {
            //Simple list
            let rows = document.getElementsByClassName('sort')
            Array.from(rows).forEach(row =>{
                new Sortable (row ,{
                    group: 'shared', //set both lists to same group
                    animation: 500
                });
            });
        }
    }
</script>

<style>

    #list-members {
        align-items: center;
        display: flex;
        height: 500px;
        flex-direction: column;
    }

    img {
        width: 96px;
        height: 96px;
    }
</style>