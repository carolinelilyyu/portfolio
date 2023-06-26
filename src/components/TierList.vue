

<template>
    <h1 id="title">Discord Server Allignment List</h1>
    
    <div id="table">

        <div class="row">
            <div class="list-name cell">
                <input type="text" value="S" class="tier1 level">
            </div>
            <div class="list-values cell">
                <div class="tier sort ui-sortable"></div>
            </div>
        </div>

        <div class="row">
            <div class="list-name cell">
                <input type="text" value="A" class="tier2 level">
            </div>
            <div class="list-values cell">
                <div class="tier sort ui-sortable"></div>
            </div>
        </div>

        <div class="row">
            <div class="list-name cell">
                <input type="text" value="B" class="tier3 level">
            </div>
            <div class="list-values cell">
                <div class="tier sort ui-sortable"></div>
            </div>
        </div>

        <div class="row">
            <div class="list-name cell">
                <input type="text" value="C" class="tier4 level">
            </div>
            <div class="list-values cell">
                <div class="tier sort ui-sortable"></div>
            </div>
        </div>


        <div class="row">
            <div class="list-name cell">
                <input type="text" value="D" class="tier5 level">
            </div>
            <div class="list-values cell">
                <div class="tier sort ui-sortable"></div>
            </div>
        </div>


        <div class="row">
            <div class="list-name cell">
                <input type="text" value="E" class="tier6 level">
            </div>
            <div class="list-values cell">
                <div class="tier sort ui-sortable"></div>
            </div>
        </div>


        <div class="row">
            <div class="list-name cell">
                <input type="text" value="F" class="tier7 level">
            </div>
            <div class="list-values cell">
                <div class="tier sort ui-sortable"></div>
            </div>
        </div>
    </div>

</template>

<script>
</script>

<style>

    .list-name {
        height: 100px;
    }

    .list-values {
        border: solid;
        border-color: black;
        width: 500px;
        height: 100px;
        background-color: #40444b;
    }

    .tier {
        height: 100px;
        width: 500px;
    }

    input {
        text-align: center;
        height: 100px;
        /* outline: none; */
        border: solid;
    }
    
    .row {
        display: flex;
    }

    .tier1 {
        background-color: rgb(255, 116, 116);
    }

    .tier2 {
        background-color: rgb(255, 151, 116);
    }

    .tier3 {
        background-color: rgb(255, 223, 116);
    }

    .tier4 {
        background-color: rgb(211, 255, 116);
    }

    .tier5 {
        background-color: rgb(116, 255, 121);
    }
    
    .tier6 {
        background-color: rgb(116, 218, 255);
    }
    

    body {
        background-color:#202225;
    }
</style>