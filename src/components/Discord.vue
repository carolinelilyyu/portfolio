<template>
    <h2 id="title">{{ serverName }}</h2>


        <div id="listleftright">
            <div id="listupdown" class="sort ui-sortable" style="padding-top:25px;">
                <img v-for="image in Object.keys(images1)"
                    :alt="image"
                    :src="images1[image]"
                >
            </div>
            <div id="listupdown" class="sort ui-sortable" style="padding-top:25px;">
                <img v-for="image in Object.keys(images2)"
                    :alt="image"
                    :src="images2[image]"
                >
            </div>
            <div id="listupdown" class="sort ui-sortable" style="padding-top:25px;">
                <img v-for="image in Object.keys(images3)"
                    :alt="image"
                    :src="images3[image]"
                >
            </div>
        </div>
</template>

<script>
    import Sortable from 'sortablejs'
    import image1 from "../img/1.jpg"
    import image2 from "../img/2.jpg"
    import image3 from "../img/3.jpg"
    import image4 from "../img/4.jpg"
    import image5 from "../img/5.jpg"
    import image6 from "../img/6.jpg"
    import image7 from "../img/7.jpg"
    import image8 from "../img/8.jpg"
    import image9 from "../img/9.jpg"
    import image10 from "../img/10.jpg"
    import image11 from "../img/11.jpg"
    import image12 from "../img/12.jpg"
    import image13 from "../img/13.jpg"
    import image14 from "../img/14.jpg"
    import image15 from "../img/15.jpg"
    import image16 from "../img/16.jpg"

    export default {
        data() {
            return {
                serverName: 'Memecraft',
                project: 'default',
                listName: 'List',
                images1: {image1, 
                    image2, 
                    image3,
                    image4,
                    image5,
                    image6,
                    image7,
                },
                images2: {
                    image8,
                    image9,
                    image10,
                    image11,
                    image12,
                    image13,
                    image14,
                },
                images3: {
                    image15,
                    image16,
                }
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
    #listleftright {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    #listupdown {
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