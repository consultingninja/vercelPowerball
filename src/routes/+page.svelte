<script>
    import { fade } from "svelte/transition";
    export let data;

    //we have list of top 10 most often chosen regular and powerballs! 
    //lets start generating sets to play!

    let sets = [];
    function generateSet(topRegBalls,topPowerBalls){
        let set = new Set();
        if(!topRegBalls || !topPowerBalls) return;
        while(set.size < 5){
            let randomIndex = Math.floor(Math.random() * topRegBalls.length);
            let randomObject = topRegBalls[randomIndex];
            if(!set.has(parseInt(randomObject.key))){
            set.add(parseInt(randomObject.key));
            }
        }
        let redBallAdded = false;
        while(!redBallAdded){
            let randomIndex = Math.floor(Math.random() * topPowerBalls.length);
            let randomObject = topPowerBalls[randomIndex];
            if(!set.has(parseInt(randomObject.key))){
            set.add(parseInt(randomObject.key));
            redBallAdded = true;
            }
        }
        sets.push(Array.from(set));
        sets = sets;
        console.log('sets', sets);
        }



    function handleDelete(index){
        //need to be able to delete them!
        sets.splice(index,1);
        sets = sets
    }




</script>

<div class="header-wrapper">
    <h1>Welcome to the PowerBall Generator (Beta)</h1>
    <h2>I wish you luck!</h2>
    <button on:click={generateSet(data.ballInfo.topRegBalls,data.ballInfo.topPowerBalls)}>Generate Set</button>
</div>
    <div class="container-wrapper">
    
        {#each sets as set, setIndex (setIndex)}
            <div class="ball-wrapper" >
                {#each set as ball, index (index)}
                    <div transition:fade="{{delay: 250, duration: 300}}" class={index <5? 'ball' : 'powerball'}><span>{ball}</span></div>
                {/each}
                <button class="btn-delete" on:click={handleDelete(setIndex)} transition:fade="{{delay: 250, duration: 300}}" >
                    <span class="material-symbols-outlined">
                        delete
                        </span>
                </button>
            </div>
        {/each}
    
    </div>



<style>
    .btn-delete{
        height: 3.5em;
        width: 3.5em;
        margin-left: .25em;
        background-color: #242424;
        text-align: center;
    }
    .btn-delete:hover{
        box-shadow: 0 0 10px #fff;
        transition: all 0.2s ease-in-out;
        opacity: .5;
        cursor:pointer
    }
    .material-symbols-outlined{
        color:#FFF;
        height: auto;
    }
    .container-wrapper{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .ball-wrapper{

        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 1em;
        font-size: larger;
        margin-right: 1em;
    }
    .ball{
        background-color: #FFF;
        color: #242424;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin-right: 1em;
        margin-bottom: .5em;
        padding: .5em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .powerball{
        background-color: #b31212;
        color: #FFF;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin-right: .3em;
        margin-bottom: .5em;
        padding: .5em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
